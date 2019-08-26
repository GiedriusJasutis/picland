exports.getEdit = (req, res, next) => {
  res.render('admin/edit', {
    csrfToke: req.csrfToken()
  });
};
