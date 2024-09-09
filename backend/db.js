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
  avatarImg: {
    type: String,
  },
  todos: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

// Schema for Avatar Images...
const avatarSchema = new mongoose.Schema({
  imageLink: [
    {
      imageName: {
        type: String,
        required: true,
      },
      cdnLink: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create a model from the schema user
const User = mongoose.model("User", userSchema);
const Avatar = mongoose.model("Avatar", avatarSchema);

module.exports = {
  User,
  Avatar,
};
