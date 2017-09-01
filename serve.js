/* app Server -- open localhost */

var express = require('express')
  , request = require('request')
  , http = require('http'),
   mime = require('mime');
httpProxy = require('http-proxy');

//proxy = new httpProxy.RoutingProxy();  

const port = 3030;
const opn = require('opn');

var app = express();

//app.use(express.logger('dev')); //no longer
mime.lookup('.map'); 


// serve static files
app.use(express.static(__dirname + '/app'));

// start listening
app.listen(port, function() {
  console.log('Listening on port '+port);
});

// My attempt to use node http-proxy, may or may not work  
// Seems to work when trying to proxy to a web site and AGS URLs, so ok  
app.all('/proxy', function (req, res) {  
    var buffer,  
    url_,  
    _query,  
    _query_url,  
    full_url,  
    clean_url;  
    /* 
    * Apparently need this buffer because 
    * express turns a POST body response 
    * into an object. 
    **/  
    buffer = httpProxy.buffer(req);  
    url_ = req.url.split('?')[1];  
    _query = req.url.split('?')[2];  
    _query_url = '';  
    if (typeof _query !== 'undefined') {  
        _query_url = '?' + _query;  
    }  
    full_url = url_ + _query_url;  
    req.url = full_url;  
    clean_url = url.parse(url_);  
    httpProxy.proxyRequest(req, res, {  
        host: clean_url.host,  
        port: 80,  
        buffer: buffer  
    });  
}); 

opn('http://localhost:'+port);