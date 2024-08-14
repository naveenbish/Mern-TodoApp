const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

// Signup Logic
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(404).json({ error: "invalid email and password." });
  }

  const existingEmail = await User.findOne({
    email: req.body.email,
  });

  if (existingEmail) {
    // return res.json({
    //   message: "User already Exist, Please go with some other email.",
    //   statusCode: 0,
    // });
    return res.status(404).json({ error: "User already Exists." });
  }

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
  });
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    // return res.status(411).json({
    //   message: "Please match the requirement / Incorrect inputs",
    // });
    return res.json({
      statusCode: 0,
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  });

  try {
    if (user.email == req.body.email && user.password == req.body.password) {
      const userId = req.body._id;
      const token = jwt.sign(
        {
          userId,
        },
        JWT_SECRET,
      );
      return res.json({
        message: "Login successfully!!",
        statusCode: 1,
        token: token,
      });
    } else {
      // return res.status(403).json({
      //   message: "Invalid Creds",
      // });
      return res.json({
        statusCode: 0,
      });
    }
  } catch (err) {
    // return res.status(411).json({
    //   message: "Invalid Creds",
    // });
    return res.json({
      statusCode: 0,
    });
  }
});

module.exports = router;
