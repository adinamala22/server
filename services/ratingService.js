const Ratings = require('../models/Ratings');

// Insert a new rating
const insertRating = async (rating) => {
    try {
        const savedRating = await Ratings.create(rating);
        return savedRating;
    } catch (err) {
        throw new Error('Error saving rating');
    }
};

// Get all ratings
const getRatings = async () => {
    try {
        const ratings = await Ratings.find();
        return ratings;
    } catch (err) {
        throw new Error('Error retrieving ratings');
    }
};

module.exports = {
    insertRating,
    getRatings,
};
