const User = require('./../models/User');
const uuidv1 = require('uuid/v1');

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

// get update
exports.getEditUpdate = (req, res, next) => {
  console.log(req.params);
  const cardId = req.params.cardId;

  User.findById(req.user._id)
    .then(user => {
      const currentCard = user.createImageStore.find(data => {
        return data._id.toString() === cardId;
      });
      return currentCard;
    })
    .then(currentCard => {
      console.log(currentCard);
      res.render('admin/edit', {
        userCards: [currentCard]
      });
    });
};

exports.postDeleteCard = (req, res, next) => {
  const cardId = req.body.deleteImage;
  User.findById(req.user._id)
    .then(user => {
      const updatedCard = user.createImageStore.filter(
        image => image._id.toString() !== cardId
      );

      user.createImageStore = updatedCard;
      return user.save();
    })
    .then(result => {
      console.log('card was successful deleted');
    })
    .catch(err => {
      console.log(err);
    });

  res.redirect('/admin/edit');
};

// add new image card
exports.addNewCard = (req, res, next) => {
  const imageUrl = req.body.imageUrl;
  const describe = req.body.describe;
  const creator = req.body.creator;
  console.log(creator);

  User.findById(req.user._id).then(user => {
    user.createImageStore.push({
      image: imageUrl,
      description: describe,
      creator: creator
    });
    user.save();
    res.redirect('/admin/edit');
  });
};
