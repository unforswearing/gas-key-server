A toy key server built on the Google Apps Script platform, which handles the GET/POST requests internally. This is a project for learning. Please do not use this project for anything critical.

Notes

- I generally followed the guides for the [Google Apps Script HTML service](https://developers.google.com/apps-script/guides/html)
- Keys to access the server must be generated elsewhere.
  - I used `md5` on MacOS. `md5sum` works on Linux.
- This version of the server works as-is, but I do not reccommend using it for anything critical without first verifying its security and updating any relevant code.
- Additional information can be found in `documentation.js`
