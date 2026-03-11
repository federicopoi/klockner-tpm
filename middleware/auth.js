const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const THROTTLE_MS = 5 * 60 * 1000; // 5 minutes

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload
    req.user = decoded;

    // Fire-and-forget: track last activity (throttled to every 5 min)
    User.updateOne(
      {
        _id: req.user.id,
        $or: [
          { lastActivity: null },
          { lastActivity: { $lt: new Date(Date.now() - THROTTLE_MS) } },
        ],
      },
      { $set: { lastActivity: new Date() } }
    )
      .exec()
      .catch((err) => {
        console.error("trackActivity error:", err.message);
      });

    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}
module.exports = auth;
