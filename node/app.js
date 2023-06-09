const axios = require("axios");
const path = require('path');
const fs = require("fs");
const https = require('https');

// my twitter profile pic as a test image
// const TEST_IMAGE = 'https://pbs.twimg.com/profile_images/1410213120279072782/k25ZNXOI_400x400.jpg'
const SPACE_ID = "slyLWIDvhNxBPDv6\\Your%20WebSocket%20API%20Server";

fs.readFile(path.join(__dirname, "./local.jpg"), function (err, data) {
  if (err) reject(err); // Fail if the file can't be read.
  console.log(data);
  axios.post("https://gather.town/api/uploadImage", {
  // axios.post("localhost:3000", {
    bytes: data,
    spaceId: SPACE_ID,
  },
  { maxContentLength: Infinity, maxBodyLength: Infinity }
  )
  .then((res) => console.log(res.data));
});

// Download an image from a url and save locally
// Call with:
//////
// downloadImage(TEST_IMAGE, 'local.jpg')
//     .then(console.log)
//     .catch(console.error);
//////
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
      https.get(url, (res) => {
          if (res.statusCode === 200) {
              res.pipe(fs.createWriteStream(filepath))
                  .on('error', reject)
                  .once('close', () => resolve(filepath));
          } else {
              // Consume response data to free up memory
              res.resume();
              reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

          }
      });
  });
}