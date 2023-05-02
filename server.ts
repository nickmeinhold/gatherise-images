import { parseMediaType } from "https://deno.land/std@0.185.0/media_types/parse_media_type.ts";

const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const conn of server) {
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn); // upgrade network connection to HTTP
  for await (const requestEvent of httpConn) {
    
    const queryUrl = new URL(requestEvent.request.url);
    const urlString = queryUrl.searchParams.get('imageUrl');
    const spaceId = queryUrl.searchParams.get('spaceId');

    if(spaceId === null) {
      requestEvent.respondWith(new Response('Error: No spaceId in parameters.', { status: 400 }));
      return;
    } 

    try {
      const data = await getRemoteImage(urlString);

      // const body = JSON.stringify({bytes: data, spaceId: spaceId });
      const formData = new FormData();
      formData.append("spaceId", "slyLWIDvhNxBPDv6\\Your%20WebSocket%20API%20Server");
      formData.append("bytes", new Blob([data]));

      const gatherResponse : Response = await fetch("https://gather.town/api/uploadImage", {
        method: "POST",
        body: formData
      });

      if (!gatherResponse.ok) {
        throw new Error("Network response was not OK");
      }

      console.log(gatherResponse.type);
      console.log(gatherResponse.status);
      console.log(gatherResponse.statusText);
      console.log(gatherResponse.text);

      const gatherResponseJson = await gatherResponse.json();

      requestEvent.respondWith(new Response(gatherResponseJson, { status: 200}));
    }
    catch(e) {
      requestEvent.respondWith(new Response(e.message, { status: 400 }));
      return;
    }
  }
}

async function getRemoteImage(imageUrlString: string | null) : Promise<Uint8Array> {

  if(imageUrlString === null) {
    throw new Error('Error: No urlString in parameters.');
  } 

  const imageUrl = decodeURI(imageUrlString);
  const sourceRes = await fetch(imageUrl);

  if (!sourceRes.ok) {
    throw new Error('Error retrieving image from URL.');
  }

  const mediaType = parseMediaType(sourceRes.headers.get("Content-Type")!)[0];
  if (mediaType.split("/")[0] !== "image") {
    throw new Error('Error: URL is not image type.');
  }

  return new Uint8Array(await sourceRes.arrayBuffer());
  
}
