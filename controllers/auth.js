const User = require('../models/User');
// const Images = require('../models/Images');
const bcrypt = require('bcryptjs');
// login

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    errorMessage: undefined,
    csrfToken: req.csrfToken()
  });
};

exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      res.render('auth/login', {
        errorMessage: 'User with given email was not found',
        msgStyle: 'alert alert-danger'
      });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          req.session.loggedIn = true;
          req.session.accountState = true;
          return res.redirect('/admin/edit');
        }

        res.render('auth/login', {
          errorMessage: 'Wrong password',
          msgStyle: 'alert alert-danger'
        });
      });
    }
  });
};

// sign up

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

  User.findOne({ email: email }).then(user => {
    console.log(user);
    if (!user) {
      if (password === confirmPassw) {
        bcrypt
          .hash(password, 12)
          .then(hashedPassw => {
            // create user
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
            req.flash('accept', 'You signed up succesfully!');
            res.redirect('/auth/login');
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        req.flash('error', 'Passwords not matching');
        res.redirect('/auth/signup');
      }
    } else {
      console.log('user exist');
      req.flash('error', 'User with given email already exist');
      res.redirect('/auth/signup');
    }
  });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};
