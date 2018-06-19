/*
*
* Node.js API
*
*/

//Dependencies
const http = require('http');
const url = require('url');

//Server response
const server = http.createServer((req, res) => {

  //Get, parse, and trim URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  //Get query string
  const queryStringObj = parsedUrl.query;

  //Get HTTP method
  const method = req.method.toLowerCase();

  //response
  res.end("Hello World");

  console.log("request recieved on " + trimmedPath + "with this method:" + queryStringObj);
});

//Start server on port 3000
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
