/*
  // This is the key server helper object
  var ks = new KeyServer(token)
  
  ks.serverUrl is the url to the published key server script
*/
function KeyServer(token) {
  var ks = {
    authToken: token,
    serverUrl: false,
    options: {
      'method': 'GET',
      'followRedirects': true,
      'muteHttpExceptions': true
    },
    add: function (service, serviceToken) {  
      var auth = this.authToken;
      var method = 'add';
      
      var query = '?token=' + auth + 
        '&action=' + method + 
        '&service=' + service +
        '&serviceToken=' + serviceToken;
      
      var url = this.serverUrl + query;
        
      var result = UrlFetchApp.fetch(url, this.options);
      return JSON.parse(result);
    },
    get: function (service) {
      var auth = this.authToken;
      var method = 'get';
      
      var query = '?token=' + auth + '&action=' + method + '&service=' + service;
    
      var url = this.serverUrl + query;
    
      var result = UrlFetchApp.fetch(url, this.options);
      return JSON.parse(result.getContentText());
     }
  }
  
  return ks;
}
