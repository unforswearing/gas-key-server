A toy key server built on the Google Apps Script platform, which handles the GET/POST requests internally. This is a project for learning. Please do not use this project for anything critical.

Notes

- I generally followed the guides for the [Google Apps Script HTML service](https://developers.google.com/apps-script/guides/html) and [Google Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- Service API keys are stored in the `script properties` of the project
  - [More information about Properties Service](https://developers.google.com/apps-script/guides/properties)
- Keys to access the server must be generated elsewhere.
  - I used `md5` on MacOS. `md5sum` works on Linux.
- This script must have at least one saved version.
- This script also must to be "published to the web" so it can respond to external requests
  - See the [Google Apps Script Web Apps guide](https://developers.google.com/apps-script/guides/web) for more information
- Additional information can be found in `documentation.js`
