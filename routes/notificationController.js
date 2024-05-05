const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const notificationService = require('../services/notificationService');

// Save Notification
router.post('/', async (req, res) => {
    try {
        const notification = new Notification(req.body);
        const savedNotification = await notificationService.insertNotification(notification);
        res.status(201).send(savedNotification);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get All Notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await notificationService.getNotifications();
        res.status(200).send(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
