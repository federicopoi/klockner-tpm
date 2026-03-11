const User = require("../models/User");

const THROTTLE_MS = 5 * 60 * 1000; // 5 minutes

function trackActivity(req, res, next) {
  if (!req.user || !req.user.id) {
    return next();
  }

  // Fire-and-forget: update only if lastActivity is null or older than 5 min
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
}

module.exports = trackActivity;
