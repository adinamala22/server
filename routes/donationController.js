const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const UserLogIn = require('../models/UserLogIn');
const donationService = require('../services/donationService');
const userLogInService = require('../services/userLoginService');

// Save Donations
router.post('/', async (req, res) => {
    try {
        const { donorUserId, recipientUserId } = req.body;

        // Fetch donor and recipient details
        const donor = await userLogInService.getLoginById(donorUserId);
        const recipient = await userLogInService.getLoginById(recipientUserId);

        if (!donor || !recipient) {
            return res.status(400).send('Invalid donor or recipient ID');
        }

        // Create new Donation instance
        const donation = new Donation({
            donor: donor,
            recipient: recipient,
            // other donation properties from req.body
        });

        // Save the donation
        const savedDonation = await donationService.insertDonation(donation);
        res.status(201).send(savedDonation);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get All Donations
router.get('/', async (req, res) => {
    try {
        const donations = await donationService.getDonation();
        res.status(200).send(donations);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get Recipients by Donor ID
router.get('/recipients/:donorId', async (req, res) => {
    try {
        const { donorId } = req.params;
        const recipients = await donationService.getRecipientsByDonorId(donorId);
        res.status(200).send(recipients);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
