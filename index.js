/*
*
* Node.js API
*
*/

//Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

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

  //Get headers object
  const headers = req.headers;

  //Get payload
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    //response
    res.end("Hello World");
  });
});

//Start server on port 3000
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
