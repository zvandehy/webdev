const http = require('http');
const fs = require('fs');

const port = 8084;
const host = "localhost";

// createServer can take the request listener (instead of server.on("request)", ...);)
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    let path = "./03_nodeserver/";

    if (req.url === '/') {
        path += "index.html";
    } else if (req.url == "/contact") {
        path += "contact.html";
    } else if (req.url == "/about") {
        path += "about.html";
    } else {
        path += "404.html"
        res.statusCode = 404;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(port, host, () => {
    console.log("The server is listening on port: " + port);
});