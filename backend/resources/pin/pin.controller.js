const { Board } = require('../board/board.model');
const { User } = require('../user/user.model');
const { Pin } = require('./pin.model');

// Done and working
const createPin = async (req, res) => {
  try {
    // Get the user
    const user = await User.findById({ _id: req.params.userId });

    // Make sure the user owns the board
    if (user) {
      if (user.boards.includes(req.params.boardId)) {
        // If they do, we can make some pinzzz 📌
        const newPin = new Pin({
          name: req.body.name,
          link: req.body.link,
          imageURL: req.body.imageURL,
          description: req.body.description,
        });
        await newPin.save();

        // Link the new pin to the board
        const board = await Board.updateOne(
          { _id: req.params.boardId },
          {
            $push: { pins: newPin },
          }
        );

        return res.status(200).json({ newPin });
      }
    }
    return res
      .status(409)
      .send({ error: "Board with specified ID doesn't exist" });
  } catch (err) {
    console.error(err);
    return res.status(409).json({ error: err });
  }
};

// Done and working
const updatePinById = async (req, res) => {
  try {
    // Get the user
    const user = await User.findById({ _id: req.params.userId });
    // Make sure the user owns the board
    if (user) {
      if (user.boards.includes(req.params.boardId)) {
        // If they do, get the board
        const board = await Board.findById({ _id: req.params.boardId });

        // Make sure the board has the specified pin
        if (board.pins.includes(req.params.pinId)) {
          // Get the current pin info
          const currentPin = await Pin.findById(req.params.pinId);

          // Only update the values if the user provides them
          const updatedPin = await Pin.updateOne(
            { _id: req.params.pinId },
            {
              $set: {
                name: req.body.name ? req.body.name : currentPin.name,
                link: req.body.link ? req.body.link : currentPin.link,
                image: req.body.imageURL
                  ? req.body.imageURL
                  : currentPin.imageURL,
                description: req.body.description
                  ? req.body.description
                  : currentPin.description,
              },
            }
          );
          return res.status(200).json({ message: 'Pin updated' });
        }
      }
    }
    return res.status(200).json({ message: 'Pin ID does not exist' });
  } catch (err) {
    console.error(err);
    return res.status(409).json({ error: err });
  }
};

// Done and working
const getPinById = async (req, res) => {
  try {
    // Get the user
    const user = await User.findById({ _id: req.params.userId });
    // Make sure the user owns the board
    if (user) {
      if (user.boards.includes(req.params.boardId)) {
        // If they do, get the board
        const board = await Board.findById({ _id: req.params.boardId });

        // Make sure the board has the specified pin
        if (board.pins.includes(req.params.pinId)) {
          const pin = await Pin.findById({ _id: req.params.pinId });
          return res.status(200).json({ pin });
        }
      }
    }
    return res
      .status(200)
      .json({ message: 'Pin on specified board does not exist' });
  } catch (err) {
    console.error(err);
    return res.status(409).send({ error: err });
  }
};

// Done and working
const getPins = async (req, res) => {
  try {
    // Get the user
    const user = await User.findById({ _id: req.params.userId });
    // Make sure the user owns the board
    if (user) {
      if (user.boards.includes(req.params.boardId)) {
        // If they do, get the board and then get the pins on that board
        const board = await Board.findById({ _id: req.params.boardId });
        const pins = await Pin.find({ _id: board.pins });
        return res.status(200).json({ pins });
      }
    }
    return res.status(200).json({ pins: [] });
  } catch (err) {
    console.error(err);
    return res.status(409).send({ error: err });
  }
};

// Done and working
const deletePinById = async (req, res) => {
  try {
    // Get the user
    const user = await User.findById({ _id: req.params.userId });
    // Make sure the user owns the board
    if (user) {
      if (user.boards.includes(req.params.boardId)) {
        // If they do, get the board
        const board = await Board.findById({ _id: req.params.boardId });

        // Make sure the board has the specified pin
        if (board.pins.includes(req.params.pinId)) {
          // Delete the pin with the specified ID
          const deleted = await Pin.deleteOne({ _id: req.params.pinId });

          if (deleted.deletedCount) {
            // Remove the pin ID from the board's array of pins
            const updatedUser = await Board.updateOne(
              { _id: req.params.boardId },
              {
                $set: {
                  pins: board.pins.filter(
                    (id) => id.toString() !== req.params.pinId
                  ),
                },
              }
            );
            return res
              .status(200)
              .json({ message: `Deleted pin with ID: ${req.params.pinId}` });
          }
        }
      }
    }
    return res
      .status(200)
      .json({ message: 'Pin on specified board does not exist' });
  } catch (err) {
    console.error(err);
    return res.status(409).send({ error: err });
  }
};

// Done and working
const deletePins = async (req, res) => {
  try {
    // Get the user
    const user = await User.findById({ _id: req.params.userId });
    // Make sure the user owns the board
    if (user) {
      if (user.boards.includes(req.params.boardId)) {
        // If they do, get the board
        const board = await Board.findById({ _id: req.params.boardId });

        // Delete all the pins on the board
        const deleted = await Pin.deleteMany({ _id: board.pins });

        // Reset the pin array on the board
        const updatedBoard = await Board.updateOne(
          { _id: req.params.boardId },
          { $set: { pins: [] } }
        );

        // If we deleted pins, respond accordingly
        if (deleted.deletedCount) {
          return res.status(200).json({
            message: `Deleted pins on board with ID: ${req.params.boardId}`,
          });
        }
      }
    }
    return res.status(200).json({
      message: `Board with ID ${req.params.boardId} does not have any pins`,
    });
  } catch (err) {
    console.error(err);
    return res.status(409).send({ error: err });
  }
};

module.exports = {
  createPin,
  updatePinById,
  getPinById,
  getPins,
  deletePinById,
  deletePins,
};
