require("dotenv").config();
const mongoose = require("mongoose");

// connect with database
mongoose.connect(process.env.mongodbUrl);

// Create a Schema for Users
const userSchema = new mongoose.Schema({
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

// Create a Schema for Todo List
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

// Create a model from the schema user
const User = mongoose.model("User", userSchema);
// Create a model from the schema todo
const Todo = mongoose.model("todos", todoSchema);

module.exports = {
  User,
  Todo,
};
