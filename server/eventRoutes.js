
const express = require('express');
const Event = require('./models/Event');
const Notification = require('./models/Notification');
const router = express.Router();

router.get('/', async (req, res) => {
  const { month, year } = req.query;  
  const filter = {};

  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);  
    filter.date = { $gte: startDate, $lte: endDate }; 
  }

  try {
    const events = await Event.find(filter).populate('user');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events", details: err.message });
  }
});

// Add a new event
router.post('/', async (req, res) => {
  const { title, description, time, date, user } = req.body;

  const newEvent = new Event({ title, description, time, date, user });

  try {
    await newEvent.save();

    // Create notification for the new event
    const newNotification = new Notification({
      title: `${title}`,
      event: newEvent._id,
      user: user
    });

    await newNotification.save();

    res.status(201).json({
      message: "Event added successfully",
      event: newEvent,
      notification: newNotification
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add event", details: err.message });
  }
});

// Update an existing event and corresponding notification
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, time, date, user,read } = req.body;

  try {
    // Update event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, time, date, user },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Update notification associated with this event
    const updatedNotification = await Notification.findOneAndUpdate(
      { event: id },
      { title: `${title}` },
      { read: read },
      { new: true }
    );

    res.json({
      message: "Event and notification updated successfully",
      event: updatedEvent,
      notification: updatedNotification || null // Handle case if notification was not found
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update event and notification", details: err.message });
  }
});

// Delete an event and corresponding notification
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the event
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Delete the corresponding notification
    const deletedNotification = await Notification.findOneAndDelete({ event: id });

    res.json({
      message: "Event and notification deleted successfully",
      event: deletedEvent,
      notification: deletedNotification || null // Handle case if notification was not found
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event and notification", details: err.message });
  }
});

module.exports = router;
