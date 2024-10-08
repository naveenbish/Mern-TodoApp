const express = require("express");
const router = express.Router();
const { Avatar, User } = require('../db')
const zod = require("zod");
const { updateAvatar } = require('../zod/types')
const authMiddleware = require("../middleware.js");

router.use(authMiddleware);

router.get("/images", async (req, res) => {
  const avatarImgs = await Avatar.find();
  try {
    const avatar = avatarImgs[0].avatarImages.urls;
    res.json({
      // avatarImgs,
      avatar,
    });
  } catch (error) {
    console.error(error);
  }
});

router.put("/update", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateAvatar.safeParse(updatePayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }

  const user = await User.findById(req.userId);
  user.avatarImg = req.body.newAvatarUrl;
  await user.save();

  res.json({
    msg: "Avatar Updated!",
    avatar: user.avatarImg,
  });
});

module.exports = router;
