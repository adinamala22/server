const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const conversationService = require('../services/conversationService');

// Save Conversation
router.post('/', async (req, res) => {
    try {
        const conversation = new Conversation(req.body);
        const savedConversation = await conversationService.insertConversation(conversation);
        res.status(201).send(savedConversation);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get All Conversations
router.get('/', async (req, res) => {
    try {
        const conversations = await conversationService.getAllConversations();
        res.status(200).send(conversations);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
