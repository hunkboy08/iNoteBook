const mongoose = require('mongoose')
require('dotenv').config();
const mongoURI = process.env.MONGOURI;

const connectToMongoose = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected To Database")
    } catch (err) {
        console.error(`Error In Connection : ${err}`);
    }
}
module.exports = connectToMongoose; 