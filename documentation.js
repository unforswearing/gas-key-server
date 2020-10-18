/*
 - Generate a key by using any text with md5 / md5sum
   - eg. 'echo my_name | md5 ' becomes '4666026ae7fd74faf74b4503e213ce5d' <- this is your key
 - Create a new Google Apps Script project
   - https://script.google.com/create
 - Add 'main.js' to the project you created in the previous step
 - Save a version of the script
   - File > Manage Versions > Save New Version
 - Deploy as webapp
   - Publish > Deploy As Webapp
   - Execute app as yourself
   - Who has access to the app: Anyone, even anonymous
     - You will use your generated API key to access the server
     - All other requests will result in an error
   - Deploy
   - Copy url. This will be used in the KeyServer.js file
 - Add the KeyServer.js file to a separate apps script project
   that will access the keyserver created above
 - In KeyServer.js, add the copied url to the 'ks.serverUrl' value
   - between 'ks.authToken' and 'ks.options'
 - You can use the function below to test the key server.
   - Replace the value of 'token' to use your generated key

   TO DO: need a method to create a token to use the key server
   TO DO: need a way to programmatically create the persistent cache trigger

   this token was generated using the md5 cli tool as an example
   this is not an active token, and it corresponds to no API
*/
var token = '5b19d7a9c44d140263b8e30af5a7c683';

function test() {
  // create a new instance of the key server using the token to identify yourself
  // this token must created and added to script properties via the main.js script
  var server = new KeyServer('5b19d7a9c44d140263b8e30af5a7c683');
  var tok = server.get('Github');

  Logger.log(tok);
}
