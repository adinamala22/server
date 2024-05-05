const express = require('express');
const router = express.Router();
const Ratings = require('../models/Ratings');
const ratingService = require('../services/ratingService');

// Save Rating
router.post('/', async (req, res) => {
    try {
        const rating = new Ratings(req.body);
        const savedRating = await ratingService.insertRating(rating);
        res.status(201).send(savedRating);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get All Ratings
router.get('/', async (req, res) => {
    try {
        const ratings = await ratingService.getRatings();
        res.status(200).send(ratings);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
