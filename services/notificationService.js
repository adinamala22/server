const Notification = require('../models/Notification');

// Insert a new notification
const insertNotification = async (notification) => {
    try {
        const savedNotification = await Notification.create(notification);
        return savedNotification;
    } catch (err) {
        throw new Error('Error saving notification');
    }
};

// Get all notifications
const getNotifications = async () => {
    try {
        const notifications = await Notification.find();
        return notifications;
    } catch (err) {
        throw new Error('Error retrieving notifications');
    }
};

module.exports = {
    insertNotification,
    getNotifications,
};
