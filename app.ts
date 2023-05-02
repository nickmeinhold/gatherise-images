import axios from 'npm:axios';

const SPACE_ID = "slyLWIDvhNxBPDv6\\Your%20WebSocket%20API%20Server";

////////////////////
/// axios 
////////////////////

const data = await Deno.readFile('./test_image.jpg');
// console.log(data.buffer);
// const buffer = new Buffer(data.buffer);
// const blob = new Blob([data]);

axios.post("https://gather.town/api/uploadImage", {
  bytes: data.buffer,
  spaceId: SPACE_ID,
},
{ maxContentLength: Infinity, maxBodyLength: Infinity }
)
.then((response : any) => {
  console.log('response');
  console.log(response);
})
.catch((error : any) => {
  console.log('error');
  console.log(error);
});

////////////////////
/// The Deno way
////////////////////

// const data = await Deno.readFile('./k25ZNXOI_400x400.jpg');

// const blob = new Blob([data]);

// const body = JSON.stringify({bytes: blob, spaceId: SPACE_ID });
// // const formData = new FormData();
// // formData.append("spaceId", SPACE_ID);
// // formData.append("bytes", new Blob([data]));

// const gatherResponse : Response = await fetch("https://gather.town/api/uploadImage", {
//   method: "POST",
//   body
// });

// if (!gatherResponse.ok) {
//   throw new Error("Network response was not OK");
// }

// console.log(gatherResponse.type);
// console.log(gatherResponse.status);
// console.log(gatherResponse.statusText);
// console.log(gatherResponse.text);
