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

  // Insert data to mongoDb
  //   title: createPayload.title,
  // await Todo.create({
  //   description: createPayload.description,
  //   completed: false,
  // });
  //
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

// To update the check button to complete(green) and incomplete(red).
// router.put("/complete", async (req, res) => {
//   const updatePayload = req.body;
//   const parsedPayload = ComDelTodo.safeParse(updatePayload);
//   if (!parsedPayload.success) {
//     res.status(411).json({
//       msg: "You sent the wrong inputs",
//     });
//     return;
//   }
//   const user = await User.findById(req.userId);
//   const todos = await user.todo.find();
//   const requestedTodo = todos.map((value) => {
//     return {
//       id: value._id,
//       completed: value.completed,
//     };
//   });
//   const mrouteredTodo = requestedTodo.filter((value) => {
//     return value.id.valueOf() == req.body.id;
//   });
//
//   if (mrouteredTodo[0].completed == true) {
//     await Todo.updateOne(
//       {
//         _id: req.body.id,
//       },
//       {
//         completed: false,
//       },
//     );
//   } else {
//     await Todo.updateOne(
//       {
//         _id: req.body.id,
//       },
//       {
//         completed: true,
//       },
//     );
//   }
//   res.json({
//     msg: "ToDo marked as completed",
//   });
// });
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

// To Delete with respect to _id
// router.put("/delete", async (req, res) => {
//   const updatePayload = req.body;
//   const parsedPayload = ComDelTodo.safeParse(updatePayload);
//   if (!parsedPayload.success) {
//     res.status(411).json({
//       msg: "You sent the wrong inputs",
//     });
//     return;
//   }
//
//   const todos = await Todo.find();
//   const requestedTodo = todos.map((value) => {
//     return {
//       id: value._id,
//       completed: value.completed,
//     };
//   });
//   const mrouteredTodo = requestedTodo.filter((value) => {
//     return value.id.valueOf() == req.body.id;
//   });
//
//   if (mrouteredTodo.length == 0) {
//     return res.status(404).json({ error: "No Todo Found." });
//   }
//
//   // Delete from Database
//   try {
//     await Todo.deleteOne({ _id: mrouteredTodo[0].id });
//   } catch (e) {
//     console.log(e);
//   }
//   res.json({
//     msg: "ToDo Deleted...",
//   });
// });
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

// TO update the TODO basically Title and Description
// router.put("/update", async (req, res) => {
//   const updatePayload = req.body;
//   const todos = await Todo.find();
//   const requestedTodo = todos.map((value) => {
//     return {
//       id: value._id,
//     };
//   });
//   const mrouteredTodo = requestedTodo.filter((value) => {
//     return value.id.valueOf() == req.body.id;
//   });
//   await Todo.updateMany(
//     {
//       _id: updatePayload.id,
//     },
//     {
//       title: updatePayload.title,
//       description: updatePayload.description,
//     },
//   );
//   res.json({
//     msg: "ToDo Updated",
//   });
// });
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
