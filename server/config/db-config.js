require('dotenv').config();
const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error(`Error in connecting to MongoDB: `, error.message);
        console.error(`Detailed error: `, error);
    }
};

module.exports = { connectMongoDB };
