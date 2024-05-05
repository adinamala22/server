// Donation.js

const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'UserLogIn', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'UserLogIn', required: true },
    availability: { type: String, required: true },
    collectionAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String }
});

const Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;
