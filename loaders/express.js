const express = require('express');
const bodyParser = require('body-parser');
const corse = require('cors');

// add by david
const passport = require('passport');
const flash = require('connect-flash');
const routeAuth = require('../api/Auth/Router');
const routeProfile = require('../api/Profile/Router');
// add by david

module.exports = async (app) => {
    app = express();
    app.use(corse());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : false }));

    // add by david
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth', routeAuth);
    app.use('/profile', routeProfile);
    // add by david

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });
    
    return app;
}