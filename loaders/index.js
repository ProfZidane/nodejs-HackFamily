const ExpressLoader = require('./express');
const MongooseLoader = require('./mongo');

module.exports = async (ExpressApp) => {
    await MongooseLoader();
    console.log('Mongo is initialized to db');
    
    await ExpressLoader(ExpressApp);
    console.log('Express is initialized');
}