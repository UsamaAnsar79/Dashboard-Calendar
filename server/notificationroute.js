const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

// Get notifications for a specific user
router.get('/', async (req, res) => {
  const userId = req.query.user; // Get userId from query parameters

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const notifications = await Notification.find({ user: userId }).populate('event'); // Fetch notifications for the user
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications", details: err.message });
  }
});

// Mark a notification as read
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!updatedNotification) return res.status(404).json({ error: "Notification not found" });

    res.json({ message: "Notification marked as read", notification: updatedNotification });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification", details: err.message });
  }
});

module.exports = router;
