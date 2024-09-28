const express = require("express");
const router = express.Router();
const { Avatar } = require('../db')

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

router.get("/", (req, res) => {
  res.send('avatar here');
})

module.exports = router;
