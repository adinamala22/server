const Conversation = require('../models/Conversation');

// Insert a new conversation
const insertConversation = async (conversation) => {
    try {
        const savedConversation = await Conversation.create(conversation);
        return savedConversation;
    } catch (err) {
        throw new Error('Error saving conversation');
    }
};

// Get all conversations
const getAllConversations = async () => {
    try {
        const conversations = await Conversation.find();
        return conversations;
    } catch (err) {
        throw new Error('Error retrieving conversations');
    }
};

module.exports = {
    insertConversation,
    getAllConversations,
};
