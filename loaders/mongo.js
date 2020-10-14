const mongoose = require('mongoose');
const config = require('../config/index');

module.exports = async () => {
    const connexion = mongoose.connect(config.databaseURL,  { useNewUrlParser: true });

    return connexion;
}