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

    //Choose handler request should go to or not found
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    //construct data obj to send to handler
    const data = {
      trimmedPath,
      queryStringObj,
      method,
      headers,
      "payload": buffer
    };

    //Route request to handler specified in router
    chosenHandler(data, (statusCode = 200, payLoad = {}) => {

      // Convert payload to string
      const payLoadString = JSON.stringify(payLoad);

      //return response
      res.writeHead(statusCode);
      res.end(payLoadString);
      console.log("returning " + statusCode + payLoadString);
    });
  });
});

//Start server on port 3000
server.listen(3000, () => {
  console.log("Listening on port 3000");
});

// Define handlers

const handlers = {};

//sample handler
handlers.sample = (data, callBack) => {
  //callback http status code, and a payload object
  callBack(406, {'name': 'sample handler'});
};

//not found handler
handlers.notFound = (data, callBack) => {
  callBack(404);
};



// Define request router
const router = {
  'sample': handlers.sample
};
