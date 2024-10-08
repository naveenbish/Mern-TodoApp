const express = require("express");
const router = express.Router();
const { Todo, User } = require("../db");
const { createTodo, ComDelTodo, updateTodo } = require("../zod/types.js");
const zod = require("zod");
const authMiddleware = require("../middleware.js");

router.use(authMiddleware);

router.post("/create", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }
  if (!createPayload.title.length) {
    res.status(411).json({
      msg: "Title can't be blank",
    });
  }

  const user = await User.findById(req.userId);

  user.todos.push({
    title: createPayload.title,
    description: createPayload.description,
  });
  await user.save();

  res.json({
    msg: "Todo Created",
  });
});

router.get("/todos", async (req, res) => {
  const user = await User.findById(req.userId);
  try {
    const todos = user.todos;
    res.json({
      todos,
    });
  } catch (error) {
    console.error(error);
  }
});

router.put("/complete", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = ComDelTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }
  const user = await User.findById(req.userId);
  const todo = await user.todos[req.body.index];

  todo.completed = !todo.completed;
  await user.save();

  res.json({
    msg: "ToDo marked as completed",
    todoStatus: user.todos[0].completed,
  });
});

router.put("/delete", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = ComDelTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }

  const user = await User.findById(req.userId);
  const todo = user.todos;

  todo.splice(req.body.index, 1);
  await user.save(); // Delete from Database

  res.json({
    msg: "ToDo Deleted...",
  });
});

router.put("/update", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }

  const user = await User.findById(req.userId);
  const todo = user.todos.find((todo) => todo._id.toString() === req.body.id);
  todo.title = req.body.title;
  todo.description = req.body.description;

  await user.save();
  res.json({
    msg: "ToDo Updated",
  });
});
module.exports = router;
