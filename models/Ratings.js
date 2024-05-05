// Ratings.js

const mongoose = require('mongoose');

const RatingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserLogIn', required: true },
    rating: { type: Number },
    feedback: { type: String },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String }
});

const Ratings = mongoose.model('Ratings', RatingsSchema);

module.exports = Ratings;
