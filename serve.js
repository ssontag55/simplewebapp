/* app Server -- open localhost */

var express = require('express')
  , request = require('request')
  , http = require('http'),
   mime = require('mime');

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

opn('http://localhost:'+port);