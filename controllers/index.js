const User = require('./../models/User');

// get all users cards
exports.getIndex = (req, res) => {
  User.find()
    .then(users => {
      userCards = [];
      if (users.length !== 0) {
        users.forEach(user => {
          user.createImageStore.forEach(userCard => {
            userCards.push(userCard);
          });
        });
        return userCards;
      }

      return userCards;
    })
    .then(userCards => {
      res.render('index', {
        accountState: req.session.accountState,
        userCards: userCards
      });
    });
};
