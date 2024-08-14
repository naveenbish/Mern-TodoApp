const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const todoRouter = require("./todo");

router.use("/todo", todoRouter);
router.use("/user", userRouter);

module.exports = router;
