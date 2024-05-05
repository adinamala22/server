// Notification.js

const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserLogIn', required: true },
    notificationContent: { type: String },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
