const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
    type: String
};

const UserSchema = new Schema({
    username : options,
    email : options,
    country : options,
    skills : options,
    password : options,
    profile_image : options,
    couverture_image : options,
    link : {
        fb_link : options,
        insta_link : options,
        twitter_link : options,
        linkdlin_link : options
    },
    typeUser : options,
    online : options
})

module.exports = mongoose.model('User', UserSchema);