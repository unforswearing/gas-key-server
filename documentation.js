// Deploy as webapp (choose version)
// in script using keyserver, add helper.gs (keyServer helper) file
// TO DO: need a method to create a token to use the key server
// TO DO: need a way to programmatically create the persistent cache trigger

// this token was generated using the md5 cli tool as an example
// this is not an active token, and it corresponds to no API
var token = '5b19d7a9c44d140263b8e30af5a7c683';

function test() {
  // create a new instance of the key server using the token to identify yourself
  // this token must created and added to script properties via the main.js script
  var server = new KeyServer('5b19d7a9c44d140263b8e30af5a7c683');
  var tok = server.get('Github');

  Logger.log(tok);
}
