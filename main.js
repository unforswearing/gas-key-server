/*
  Main runner code.
*/

var debug = {};

var ps = PropertiesService.getScriptProperties();
var log = function() { ps.setProperty('debug', debug); };

var cs = (function() {
  var cs_ = CacheService.getScriptCache();

  var csParam = {
    store: function (key, obj) {
      obj = JSON.stringify(obj);
      cs_.put(key, obj, 21600);
      return this;
    },
    fetch: function (key) {
      var parsedKey = JSON.parse(cs_.get(key));
      return parsedKey;
    },
    clear: function (key) {
      cs_.remove(key);
    }
  };

  return csParam;
}());

// Persistent Cache
// this function is triggered to run every 4 hours
// the cache is set to expire at 6 hours (allowing a 2 hr trigger buffer)
function touchCache() {
  var db = cs.fetch('database');
  cs.clear('database');

  Utilities.sleep(1000);

  cs.store('database', db);
}

var validateAuthorizationToken = function (token) {
  if (!token) return false;
  var ctokens = JSON.parse(ps.getProperty('authTokens'));

  for (var key in ctokens) {
    var tok = ctokens[key];
    if (tok === token) return true;
  }
  return false;
};

// Return JSON
function doGet (e) {
  /*
    add query: {token=authToken, action=add, service=github, serviceToken=githubToken}; return keyServerParams obj
    get query: {token=authToken, action=get, service=github}; return keyServerParams obj
  */

  var params = e.parameter;
  var authToken = params.token;

  debug.params = params;
  log();

  if (!validateAuthorizationToken(authToken)) {
    var msg = { status: 'invalid token' };
    return ContentService.createTextOutput(JSON.stringify(msg));
  }

  if (params.action === 'add') {
    var service = params.service;
    var serviceToken = params.serviceToken;

    var serviceOutput = addServiceToken(service, serviceToken);

    return ContentService.createTextOutput(JSON.stringify(serviceOutput));
  }

  if (params.action === 'get') {
    service = params.service;
    serviceOutput = getServiceToken(service);

    return ContentService.createTextOutput(JSON.stringify(serviceOutput));
  }

  msg = { status: 'unable to process request' };
  return ContentService.createTextOutput(JSON.stringify(msg));
}

var generateSalt = function() {
  return hash(new Date().getTime());
};

// KeyServer.create()
function addServiceToken (service, serviceToken) {
  if (!service || !serviceToken) {
    return { status: 'argument missing. Usage: create(service, serviceToken)' };
  }

  // For database / debugging / etc
  var serviceHash = hash(service);
  var salt = generateSalt();
  var generatedToken = hash(serviceHash + salt);

  // need a try block here
  var storage = {
    id: generatedToken,
    key: serviceToken,
    salt: salt,
    lastRequestDate: new Date(),
    lastRequestStatus: true
  };

  // individual service keys are stored in properties
  // which is fine because i can search properties using 'getAll'
  // and then compare 'service' to requested service

  // this sets OR updates the key for 'service'
  ps.setProperty(service, JSON.stringify({token: storage.key}));

  // database doesn't really do much right now...
  // get db, add entry to db, store db
  var database = (function() {
    var obj = {};
    if (cs.fetch('database') === null) return obj;
    return cs.fetch('database');
  }());

  database[service] = storage;
  cs.store('database', database);

  // catch error here

  // return values for use in external script
  var keyServerParams = {};
  keyServerParams.status = storage.lastRequestStatus;
  keyServerParams.token = storage.key;
  keyServerParams.msg = 'key for "' + service + '" has been stored';

  return keyServerParams;
}

// KeyServer.get()
function getServiceToken (service) {
  if (!service) return {status: 'no argument provided'};

  // generate keyServerParams object
  var keyServerParams = {};

  // search Properties for 'service'
  for (var i = 0; i < ps.getKeys().length; i++) {
    if (ps.getKeys()[i] === service) {
      var key = ps.getKeys()[i];
      var token = ps.getProperty(key);

      keyServerParams.token = JSON.parse(token).token;
      keyServerParams.status = true;
      keyServerParams.msg = 'successfully retrieved key for "' + service + '"';

      return keyServerParams;
    }
  }

  keyServerParams.status = false;
  keyServerParams.token = null;
  keyServerParams.msg = 'unable to retrieve key for "' + service + '"';

  return keyServerParams;
}







