module.exports = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/auth/login');
  }
  next();
};
