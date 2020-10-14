const loaders = require('./loaders/index');
const config = require('./config/index');
const express = require('express');

async function startServer() {
    const app = express();

    await loaders(app);

    app.listen(config.port, (err)=>{
        if (err) {
            console.log(err);
        }
        console.log('Your server is ready');
        
    })
}

startServer();