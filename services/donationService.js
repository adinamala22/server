const Donation = require('../models/Donation');
const UserLogIn = require('../models/UserLogIn');

// Get all donations
const getDonation = async () => {
    try {
        const donations = await Donation.find();
        return donations;
    } catch (err) {
        throw new Error('Error retrieving donations');
    }
};

// Insert a new donation
const insertDonation = async (donation) => {
    try {
        const savedDonation = await donation.save();
        return savedDonation;
    } catch (err) {
        throw new Error('Error saving donation');
    }
};

// Get recipients by donor ID
const getRecipientsByDonorId = async (donorId) => {
    try {
        const donor = await UserLogIn.findById(donorId);
        const donationsByDonor = await Donation.find({ donor: donor });

        const recipients = donationsByDonor.map((donation) => donation.recipient);
        return recipients;
    } catch (err) {
        throw new Error('Error retrieving recipients');
    }
};

module.exports = {
    getDonation,
    insertDonation,
    getRecipientsByDonorId,
};
