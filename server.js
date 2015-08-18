// --------------------------------------------------------------------------------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------------------------------------------------------------------------------
var express  = require('express');
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var constants = require('./utils/constants');

// --------------------------------------------------------------------------------------------------------------------------------------------
// Variables
// --------------------------------------------------------------------------------------------------------------------------------------------
var app      = express();      // create our app w/ express


// --------------------------------------------------------------------------------------------------------------------------------------------
// Database Setup
// --------------------------------------------------------------------------------------------------------------------------------------------

var mongoURI =constants.URI_MONGODB; // "mongodb://localhost:27017/test";
var MongoDB = mongoose.connect(mongoURI).connection;  // connect to mongoDB database on local
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

// --------------------------------------------------------------------------------------------------------------------------------------------
// ENvironments
// --------------------------------------------------------------------------------------------------------------------------------------------
app.set('port', process.env.PORT || constants.SERVER_PORT);
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes ======================================================================
require('./app/routes.js')(app);

// --------------------------------------------------------------------------------------------------------------------------------------------
// Server creation
// --------------------------------------------------------------------------------------------------------------------------------------------
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
