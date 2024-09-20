const express = require('express');
const Event = require('./models/Event');
const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Add a new event
router.post('/', async (req, res) => {
  const { title, description, time, date } = req.body;
  const newEvent = new Event({ title, description, time, date });

  try {
    await newEvent.save();
    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (err) {
    res.status(500).json({ error: "Failed to add event" });
  }
});

// Update an existing event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, time, date } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, time, date },
      { new: true }
    );
    if (!updatedEvent) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
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
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;