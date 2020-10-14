const express = require('express');
const bodyParser = require('body-parser');
const corse = require('cors');

module.exports = async (app) => {
    app = express();
    app.use(corse());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : false }));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });
    
    return app;
}