const http = require('http');
const fs = require('fs');

const port = 8080;
const host = "localhost";

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    let path = "./03_nodeserver/exercise2/views/"
    if (req.url == "/contact") {
        path += "contact.html";
    } else if (req.url == "/about") {
        path += "about.html";
    } else {
        path += "404.html";
        res.statusCode = 200;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
});

server.listen(port, host, () => {
    console.log('The server is listening on port: ' + port);
});