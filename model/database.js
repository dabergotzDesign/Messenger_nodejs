const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    id: Number,
    msg_id: Number,
    avatar: String,
    profile: String,
    time: String,
    message: String
});

const MessageItem = mongoose.model("MessageItem", messageSchema);

module.exports = MessageItem;