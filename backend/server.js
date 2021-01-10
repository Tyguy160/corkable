require('dotenv').config();
const { connect } = require('./utils/db');
const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const boardRouter = require('./resources/board/board.router');
const userRouter = require('./resources/user/user.router');
const pinRouter = require('./resources/pin/pin.router');

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/user/:userId/board', boardRouter);
app.use('/user/:userId/board/:boardId/pin', pinRouter);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Listening to http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { app, start };
