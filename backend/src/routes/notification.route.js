import express from "express";
import auth from "../middleware/auth.middleware.js";
import Notification from "../models/Notification.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const notifications = await Notification.find({
    userId: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
});

router.patch("/:id/read", auth, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, {
    isRead: true,
  });
  res.json({ success: true });
});

export default router;
