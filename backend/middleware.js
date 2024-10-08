const { JWT_SECRET } = require("./config.js");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer")) {
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader;

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    if (decode.userId) {
      req.userId = decode.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports = authMiddleware;
