/* app Server -- open localhost */

var express = require('express')
  , request = require('request')
  , http = require('http'),
   mime = require('mime');

httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

const port = 3030;
const opn = require('opn');

var app = express();

//app.use(express.logger('dev')); //no longer
mime.lookup('.map'); 

// My attempt to use node http-proxy, may or may not work the best
app.all('/proxy', function (req, res) {  
    var url_
    url_ = req.url.split('?')[1];  
    proxy.proxyRequest(req, res, {  
        target: url_, 
        port: 80
    });  
}); 

// serve static files
app.use(express.static(__dirname + '/app'));

// start listening
app.listen(port, function() {
  console.log('Listening on port '+port);
});

opn('http://localhost:'+port);