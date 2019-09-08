const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./lib/errorHandler');
// const mongodb = require('./config/mongodb');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors());
// define a simple route
app.use(routes);

// Custom error handler
app.use(errorHandler);

//DB Bootstrap
APP = {};
require('./config/mongodb');

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 3000");
});