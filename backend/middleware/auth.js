const jwt = require('jsonwebtoken');

// Authentication middleware
const auth = (req, res, next) => {
  // Pull the token from the header
  const token = req.header('token');

  //   If there isn't a token, send an 'unauthorized' response
  if (token === 'undefined') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token and decode the user from the token
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Store the user on the request object
    req.user = user;

    // Move on to the next middleware
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
