const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: 'Please enter a valid email', unique: true },
  name: { type: String, required: 'Please enter your name' },
  password: { type: String, required: 'Please enter a password' },
  age: { type: String, required: 'Please enter your age' },
  boards: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  ],
});

const User = mongoose.model('User', userSchema, 'User');

module.exports = { User };
