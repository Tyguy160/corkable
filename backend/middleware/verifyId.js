const verifyId = (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return res
      .status(403)
      .json({ message: "Sorry, but this isn't yours to mess with." });
  }
  next();
};

module.exports = verifyId;
