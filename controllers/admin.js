exports.getEdit = (req, res, next) => {
  res.render('admin/edit', {
    //csrfToken: req.csrfToken()
  });
};
