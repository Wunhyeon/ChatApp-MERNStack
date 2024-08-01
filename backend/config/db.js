// backend/config/db.js

const mongoose = require("mongoose");
const color = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`mongoDB Connected : ${conn.connection.host}`.yellow.underline);
  } catch (error) {
    console.log(`Error : ${error}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
