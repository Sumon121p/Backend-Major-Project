module.exports.isLoggedin = (req, res, next) => {
  if (!req?.isAuthenticated()) {
    return res.status(400).json({ err: "you must be loged in" });
  }
  next();
};
