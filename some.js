// 9. Asynchronous validation , can wait

// In postSignup delete email, leave only bycript . Find email in database and check if it exist use here in router.

const { check } = require('express-validator/check');
const User = require('../models/user');

route.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        //--------------------------------------- here down
        //if (value === 'test@test.com') {
        // throw new Error('This email address is forbidden');
        //}
        //return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-mail exists already, please pick a different one.'
            );
          }
        });
      }),
    body(
      'password',
      'Please enter a password with only numbers and text and 5 characters'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password have to match');
      }
      return true;
    })
  ],
  authContoller.postSignup
);
