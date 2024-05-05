// db.js

const mongoose = require('mongoose');
const DB = "mongodb+srv://adinamala22:Cwjlup5HnHFm3Bii@cluster0.lw358l6.mongodb.net/mothergift"

const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
            // useNewUrlParser: true,
        });
        console.log('DB connection successful');
    } catch (error) {
        console.error('DB connection error:', error);
        process.exit(1); // Exit with failure
    }
};

module.exports = { connectDB, mongoose };
