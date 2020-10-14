const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
    type: String
};

const LikeSchema = new Schema({
    _idAuthor : options,
    _idPostCreator : options
});

module.exports = mongoose.model('Like', LikeSchema);