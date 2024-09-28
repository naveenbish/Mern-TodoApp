const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const todoRouter = require("./todo");
const avatarRouter = require("./avatar")

router.use("/todo", todoRouter);
router.use("/user", userRouter);
router.use("/avatar", avatarRouter);

module.exports = router;
