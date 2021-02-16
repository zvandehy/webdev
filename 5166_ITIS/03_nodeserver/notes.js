//require the module
const http = require("http");

//create a server
const server = http.createServer(); //event emitter

//register an event listener for incoming requests
server.on("request", (req, res) => {
    // handle incoming requests...

    // req.method
    // req.url -- what resource the user is requesting
    // req.headers
    // http.IncomingMessage class

    // res.setHeader(name, value);
    // res.writeHead(statusCode[, statusMessage][,headers]);
    // res.statusCode
    // res.write() -- add data to the body
    // res.end() -- finish and send the response
    // http.ServerResponse class
});

// bind the server to a particular port
server.listen(port, host, () => {
    // operation after successful binding...
});