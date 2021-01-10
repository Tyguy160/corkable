const mongoose = require('mongoose');

const url = `mongodb+srv://user:${process.env.MONGODB_PASSWORD}@cluster0.prae2.mongodb.net/corkable`;

const connect = () => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connect };
