const { Board } = require('./board.model');
const { User } = require('../user/user.model');
const { Pin } = require('../pin/pin.model');

// Done and working
const createBoard = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    if (user) {
      // Make a new board
      const newBoard = new Board({
        name: req.body.name,
        pins: [],
      });
      await newBoard.save();

      await User.updateOne(
        { _id: req.params.userId },
        {
          $push: { boards: newBoard },
        }
      );

      return res.status(200).json({ newBoard });
    }
    return res.status(400).json({ message: `Something went wrong` });
  } catch (err) {
    console.error(err);
    return res.status(409).json({ error: err });
  }
};

// Done and working
const getBoards = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    if (user) {
      const boards = await Board.find({ _id: user.boards });
      return res.status(200).json({ boards });
    }
    return res.status(200).json({ boards: [] });
  } catch (err) {
    console.error(err);
    return res.status(409).json({ error: err });
  }
};

const updateBoardById = async (req, res) => {
  try {
    // Get the user
    const user = await User.findById({ _id: req.params.userId });

    // If the user exists, check if they own the board with that ID
    if (user) {
      if (user.boards.includes(req.params.boardId)) {
        // If they do, update it
        const board = await Board.updateOne(
          { _id: req.params.boardId },
          { $set: { name: req.body.name } }
        );
        return res.status(200).json({ message: 'Board updated.' });
      }
    }
    return res.status(200).json({ message: 'Board ID does not exist' });
  } catch (err) {
    console.error(err);
    return res.status(409).send({ error: err });
  }
};

// Done and working
const getBoardById = async (req, res) => {
  try {
    // Get the user
    const user = await User.findById({ _id: req.params.userId });

    // If the user exists, check if they own the board with that ID
    if (user) {
      if (user.boards.includes(req.params.boardId)) {
        const board = await Board.findById(req.params.boardId);
        return res.status(200).json({ board });
      }
    }
    return res.status(200).json({ message: 'Board ID does not exist' });
  } catch (err) {
    console.error(err);
    return res.status(409).json({ error: err });
  }
};

// Done and working
const deleteBoardById = async (req, res) => {
  try {
    // Get the user
    const user = await User.findById({ _id: req.params.userId });

    // If the user exists, check if they own the board with that ID
    if (user) {
      if (user.boards.includes(req.params.boardId)) {
        // Get the board with specified ID
        const board = await Board.findById({ _id: req.params.boardId });

        // Delete all the pins on the board
        const deletedPins = await Pin.deleteMany({ _id: board.pins });

        // Delete the board with specified ID
        const deletedBoard = await Board.deleteOne({ _id: req.params.boardId });

        if (deletedBoard.deletedCount) {
          // Remove the board ID from the user's array of boards
          const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            {
              $set: {
                boards: user.boards.filter(
                  (id) => id.toString() !== req.params.boardId
                ),
              },
            }
          );
          return res.status(200).json({ message: `Deleted board` });
        }
      }
    }
    return res
      .status(200)
      .json({ message: `Nothing was deleted. Board does not exist` });
  } catch (err) {
    console.error(err);
    return res.status(409).json({ error: err });
  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoardById,
  updateBoardById,
  deleteBoardById,
};
