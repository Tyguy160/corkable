const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],
});

const Board = mongoose.model('Board', boardSchema, 'Board');

module.exports = { Board };
