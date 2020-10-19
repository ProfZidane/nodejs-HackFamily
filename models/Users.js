const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionsRequired = {type : String, required : true};
const options = {type : String};

const UserSchema = new Schema({
    username : optionsRequired,
    email : optionsRequired,
    country : optionsRequired,
    skills : options,
    password : optionsRequired,
    profile_image : options,
    couverture_image : options,
    link : {
        fb_link : options,
        insta_link : options,
        twitter_link : options,
        linkdlin_link : options
    },
    typeUser : optionsRequired,
    online : options,
    created_at : optionsRequired,
    updated_at : optionsRequired,

})

module.exports = mongoose.model('User', UserSchema);