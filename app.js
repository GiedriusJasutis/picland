const express = require('express');
const path = require('path');
const env = require('dotenv').config();
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongoSession = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

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

// public
app.use('/public', express.static(path.join(__dirname, 'public')));

// connect mongodb session

const store = new connectMongoSession({
  uri: DB_Connect,
  collection: 'session'
});

app.use(
  session({
    secret: 'secret password',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// flash
app.use(flash());

// use routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');

app.use(indexRoute);
app.use(authRoute);
app.use(adminRoute);

mongoose
  .connect(DB_Connect, { useNewUrlParser: true })
  .then(result => {
    app.listen(connectionData.port, () => console.log('Server runs on port '));
  })
  .catch(err => {
    console.log(err);
  });
