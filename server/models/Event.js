const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  time: { type: String },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;


