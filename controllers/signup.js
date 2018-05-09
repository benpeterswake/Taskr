const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.json({
    user: req.session.currentUser
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, user) => {
    if(err){
      console.log(err.message);
      if(err.code === 11000){
        console.log('email already exists');
        res.json({error: "email already exists"})
      }
    }else{
      console.log('user created: ' + user);
      res.status(200).json({ user: user, success: "User Successfully Created!"})
    }
  });
});

module.exports = router;
