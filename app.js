const express = require('express');
const path = require('path');
const env = require('dotenv').config();
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongoSession = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const User = require('./models/User');

const protectCsrf = csrf();

// environment
const connectionData = {
  port: process.env.PORT,
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};
const DB_Connect = `mongodb+srv://${connectionData.username}:${connectionData.password}@mycluster-9dlye.mongodb.net/${connectionData.database}?retryWrites=true&w=majority`;

// app
const app = express();

// views
app.set('view engine', 'ejs');

// body parser
app.use(bodyParser.urlencoded({ extended: true }));

// public
app.use('/public', express.static(path.join(__dirname, 'public')));

// connect mongodb session

const store = new connectMongoSession({
  uri: DB_Connect,
  collection: 'session'
});

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

app.use(
  session({
    secret: 'secret password',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// app.use(protectCsrf);

// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// flash
app.use(flash());

// use routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');

// use session data (were stored user) to set user id to User model and then add user to request object
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use(indexRoute);
app.use(authRoute);
app.use(adminRoute);

//connectionData.port
mongoose
  .connect(DB_Connect, { useNewUrlParser: true })
  .then(result => {
    app.listen(3000, () =>
      console.log(`Server runs on port ${connectionData.port}`)
    );
  })
  .catch(err => {
    console.log(err);
  });
