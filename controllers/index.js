exports.getIndex = (req, res) => {
  res.render('index', {
    accountState: req.session.accountState
  });
};
