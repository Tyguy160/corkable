const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  imageURL: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

const Pin = mongoose.model('Pin', pinSchema, 'Pin');

module.exports = { Pin };
