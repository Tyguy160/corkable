const { User } = require('./user.model');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  //   Get the validation results from middleware
  const errors = validationResult(req);

  // If there are errors, respond accordingly
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //   Get name, email, password, and age from the request
    const { name, email, password, age } = req.body;

    // Check to see if that user exists
    let user = await await User.findOne({ email: email.toLowerCase() });

    // If they exist, notify the frontend and return
    if (user) {
      return res
        .status(400)
        .json({ error: `A user with this email already exists` });
    }

    // Generate a salt and hash the pass
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // If they don't exist, make a new user
    const newUser = new User({
      name: name,
      email: email.toLowerCase(),
      password: hashedPass,
      age,
    });

    // Store the user in the DB
    await newUser.save();

    // Create a new token for the user id, valid for 24h
    const token = await jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Return the token
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

// TODO
const updateUser = async (req, res) => {
  return res.status(200).json({ message: 'Updated user' });
};

const login = async (req, res) => {
  //   Get the validation results from middleware
  const errors = validationResult(req);

  // If there are errors, respond accordingly
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //   Get the email and password
  const { email, password } = req.body;

  try {
    //   Find the user with the given email
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    // If there is no user, return a generic response
    if (!existingUser) {
      return res
        .status(400)
        .json({ error: 'Username or password is incorrect' });
    }

    // Otherwise compare the password to the stored pass
    const passMatch = await bcrypt.compare(password, existingUser.password);

    // If the password is wrong, return a generic response
    if (!passMatch) {
      return res
        .status(400)
        .json({ error: 'Username or password is incorrect' });
    }

    // Create a new token for the user id, valid for 24h
    const token = await jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    // Return the token
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const currentUser = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ error: 'Login required' });
    }
    const { _id: id, email, boards, name } = await User.findById(
      req.user.id
    ).populate('boards');
    return res.status(200).json({ id, email, name, boards });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

module.exports = { createUser, updateUser, login, currentUser };
