const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
    type: String
};

const MessageSchema = new Schema({
    _idAuthor : options,
    messageContent : options,
    _idReceiver : options
});

module.exports = mongoose.model('Message', MessageSchema);