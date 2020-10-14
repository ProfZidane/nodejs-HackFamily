const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
    type: String
};

const CommentSchema = new Schema({
    _idAuthor : options,
    comment : options,
    _idPostCreator : options
});

module.exports = mongoose.model('Comment', CommentSchema);
