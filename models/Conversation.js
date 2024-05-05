// Conversation.js

const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    messageContent: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: String }
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;
