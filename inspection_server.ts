// I made this to inspect requests sent by the example code we have from gather
// in order to try and figure out how to re-create the request with Deno
// (although in hindsight inspecting the request in the browser is probably just as good)
// TODO: delete when we get the API call working with Deno
// 
// run with:
// deno run --allow-net inspection_server.ts
import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

const port = 3000;

const handler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);
await serve(handler, { port });
