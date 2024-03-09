const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

router.get("/", (req, res) => {
  const data = req.body.username;
  console.log(data)
  res.send("Hello, I am user here.", data);
});

const signupBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

// Signup Logic
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Please match the requirement / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });
  const existingEmail = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Username already taken",
    });
  }

  if (existingEmail) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

module.exports = router;
