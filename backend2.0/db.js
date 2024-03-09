require('dotenv').config()
const mongoose = require("mongoose");

// connect with database
mongoose.connect(process.env.mongodbUrl);
// Create a Schema for Users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};