const User = require('./../models/User');

exports.getEdit = (req, res, next) => {
  User.findById(req.user._id).then(user => {
    if (user.createImageStore.length !== 0) {
      res.render('admin/edit', {
        userCards: user.createImageStore
      });
    } else {
      res.render('admin/edit', {
        userCards: []
      });
    }
  });
};

exports.getEditUpdate = (req, res, next) => {
  console.log('kakasi');
  res.send('please edit');
};

exports.postDeleteCard = (req, res, next) => {
  const cardId = req.body.deleteImage;
  const imageArr = req.user.createImageStore.filter(image => {
    return image._id.toString() !== cardId;
  });
  console.log(imageArr);

  User.find().then(users => {
    console.log(users.createImageStore);
  });

  res.redirect('/admin/edit');
};

exports.addNewCard = (req, res, next) => {
  const imageUrl = req.body.imageUrl;
  const describe = req.body.describe;

  User.findById(req.user._id).then(user => {
    user.createImageStore.push({ image: imageUrl, description: describe });
    user.save();
    res.redirect('/admin/edit');
  });
};
