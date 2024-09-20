
const express = require('express');
const Event = require('./models/Event');
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('user'); // Change to 'user' if single user is stored
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events", details: err.message });
  }
});

// Add a new event
router.post('/', async (req, res) => {
  const { title, description, time, date, user } = req.body; // Ensure user is the correct field

  const newEvent = new Event({ title, description, time, date, user }); // Consistent naming

  try {
    await newEvent.save();
    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (err) {
    res.status(500).json({ error: "Failed to add event", details: err.message });
  }
});

// Update an existing event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, time, date, user } = req.body; // Ensure user is consistent

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, time, date, user }, // Use 'user' if it's a single user
      { new: true }
    );
    if (!updatedEvent) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    res.status(500).json({ error: "Failed to update event", details: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event", details: err.message });
  }
});

module.exports = router;
