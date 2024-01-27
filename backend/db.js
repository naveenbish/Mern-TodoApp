require('dotenv').config()
const mongoose = require("mongoose");
const { boolean } = require('zod');

// todo {
//   title: string;
//   description: string;
//   completed: boolean;
// }

mongoose.connect(process.env.mongodbUrl);
const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
})

const todo = mongoose.model('todos', todoSchema);
module.exports = {
  todo
}
