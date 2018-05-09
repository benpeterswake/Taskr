const express = require('express')
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if(req.session.currentUser){
      res.json({
        auth: 'logged in',
        user: req.session.currentUser
      })
    }else{
      res.json({
        auth: 'logged out'
      })
    }
})

router.post('/', (req, res, error) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
      if(user == null || user == undefined){
         res.status(400).json({error: 'User not found'})
      }else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          req.session.currentUser = user;
          res.json({user: req.session.currentUser})
          req.session.save()
        }else {
          res.status(400).json({error: 'Invalid username or password'})
        }
      }
  });
});

router.delete('/', (req, res) => {
  req.session.destroy(function(err) {
    res.json({
      auth: 'logged out'
    })
  })
})

module.exports = router;
