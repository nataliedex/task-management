const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const validator = require('validator');
const connectDB = require('./config/database');
const debug = require('debug')('app:session');

// routes
const mainRoutes = require("./routes/main");

// use .env file in the config folder
require('dotenv').config({ path:'./config/.env' });

// passport config
require('./config/passport')(passport);

// connect to the database
connectDB();

// set up sessions - stored in MongoDB
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_STRING,
        }),
    })
);
app.use((req, res, next) => {
    debug('Session:', req.session);
    next();
});

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// using EJS for the views
app.set('view engine', 'ejs');

// static folder
app.use(express.static('public'));

// body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logging
app.use(logger('dev'));

// use forms for put/delete
app.use(methodOverride('_method'));

// use flash
app.use(flash());

// setup routes for the server to listen for
app.use('/', mainRoutes);

// server running
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is currently running on port: ${process.env.PORT || 8000}`);
});
