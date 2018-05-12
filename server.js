const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/omnitask';

//Libraries
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

//Controllers
const loginController = require('./controllers/login.js');
const signupController = require('./controllers/signup.js');
const postController = require('./controllers/post.js');
const offerController = require('./controllers/offer.js');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: "something", //some random string
  resave: false,
  saveUninitialized: false,
}));
app.use('/signup', signupController);
app.use('/login', loginController);
app.use('/post', postController);
app.use('/offer', offerController);

app.listen(port, ()=> {
  console.log('listening to on port', port);
});

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
