// server.js

// modules
// ========
require('dotenv').load();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const passportlocal = require('passport-local');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const scripts = require('./scripts');
// connect to database
const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE);


// confiure app to use bodyParser()
// this will const us get the data from a POST
app.use(morgan('dev'));  // logs every request to console
// app.use(cookieParser()); //read cookies

// load mongoose schemas
const User = require('./app/model/user');
const Poll = require('./app/model/poll');
// connect to the database


// use middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// set up router
// =========================
const router = express.Router();

require('./app/routes')(app, router);

// set the static files location
// ---------------------------------
app.use(express.static(__dirname + '/public'));

app.use('/', router);
// start server
// ============
app.listen(process.env.PORT);
console.log('server is listening to port: ' + process.env.PORT);
