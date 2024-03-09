const express = require("express");
const app = express();
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );
app.use(cors());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  console.log(createPayload);
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
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "Todo Created",
  });
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await todo.find();
    res.json({
      todos,
    });
  } catch (error) {
    console.log(error);
  }
});

// To update the check button to complete(green) and incomplete(red).
app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }
  const todos = await todo.find();
  const requestedTodo = todos.map((value) => {
    return {
      id: value._id,
      completed: value.completed,
    };
  });
  const mappedTodo = requestedTodo.filter((value) => {
    return value.id.valueOf() == req.body.id;
  });

  if (mappedTodo[0].completed == true) {
    await todo.updateOne(
      {
        _id: req.body.id,
      },
      {
        completed: false,
      }
    );
  } else {
    await todo.updateOne(
      {
        _id: req.body.id,
      },
      {
        completed: true,
      }
    );
  }
  res.json({
    msg: "ToDo marked as completed",
  });
});

// To Delete with respect to _id
app.put("/delete", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }

  const todos = await todo.find();
  const requestedTodo = todos.map((value) => {
    return {
      id: value._id,
      completed: value.completed,
    };
  });
  const mappedTodo = requestedTodo.filter((value) => {
    return value.id.valueOf() == req.body.id;
  });
  console.log(mappedTodo[0].id);

  // Delete from Database
  try {
    await todo.deleteOne({ _id: mappedTodo[0].id });
  } catch (e) {
    console.log(e);
  }
  res.json({
    msg: "ToDo Deleted...",
  });
});

// TO update the TODO basically Title and Description
app.put("/update", async (req, res) => {
  const updatePayload = req.body;
  const todos = await todo.find();
  const requestedTodo = todos.map((value) => {
    return {
      id: value._id,
    };
  });
  const mappedTodo = requestedTodo.filter((value) => {
    return value.id.valueOf() == req.body.id;
  });
  await todo.updateMany(
    {
      _id: updatePayload.id,
    },
    {
      title: updatePayload.title,
      description: updatePayload.description,
    }
  );
  res.json({
    msg: "ToDo Updated",
  });
});

app.listen(3000);
