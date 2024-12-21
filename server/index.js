const express = require('express');
const { connectMongoDB } = require('./config/db-config');
const app = express();
require('dotenv').config();

connectMongoDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Node+Express Server is running on port ${port}`);
});
