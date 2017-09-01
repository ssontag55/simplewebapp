var http = require('http');
const opn = require('opn')


var server = http.createServer(function (req, res) {
    var body = 'Amazing lightweight webserver using node.js\n';
    var content_length = body.length;
    res.writeHead(200, {
        'Content-Length': content_length,
        'Content-Type': 'text/plain' });
 
    res.end(body);
});

server.listen(3030);
opn('http://localhost:3030');
console.log('Server is running on port 3030');