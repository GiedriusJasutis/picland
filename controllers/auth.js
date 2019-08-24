const User = require('../models/User');
const bcrypt = require('bcryptjs');

// after login session created
exports.getLogin = (req, res) => {
  req.session.isLoggedIn = true;
  res.render('auth/login');
};

exports.postLogin = (req, res) => {
  console.log(req.body);
  res.redirect('/');
};

exports.getSignup = (req, res) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/signup', {
    errorMessage: message
  });
};

exports.postSignup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassw = req.body.confirmPassw;
  if (password === confirmPassw) {
    bcrypt
      .hash(password, 12)
      .then(hashedPassw => {
        return new User({
          email,
          password: hashedPassw
        });
      })
      .then(user => {
        return user.save();
      })
      .then(result => {
        console.log('User is saved');
        res.redirect('/auth/login');
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    req.flash('error', 'Passwords not matching');
    res.redirect('/auth/signup');
  }
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};
