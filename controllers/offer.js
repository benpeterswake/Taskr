const express = require('express')
const router = express.Router();
const Post = require('../models/post.js');

router.get('/' , (req, res) => {
  if(req.session.currentUser){
    Post.find({offers: { $elemMatch: { user_id:req.session.currentUser } } } , (err, userPosts) => {
      if(err){
        console.log(err);
        res.json({error: "error"})
      }else{
        res.json({offers: userPosts, success: "Found posts"})
      }
    }).sort('-createdAt')
  }else{
    res.json({
      auth: 'logged out'
    })
  }
})

router.put('/', (req, res) => {
  if(req.session.currentUser){
    let offerObj = {user_id: req.session.currentUser._id, name:  req.session.currentUser.name, budget: req.body.budget}
    console.log('body:', req.body);
    Post.findByIdAndUpdate(req.body._id, { $push: { offers: offerObj } }, {new:true}, (err, updatedPost) => {
      if(err){
        console.log(err);
        res.json({error: "error"})
      }else{
        console.log(updatedPost);
        res.json({post: updatedPost, success: "offer made!"})
      }
    })
  }else{
    res.json({
      auth: 'logged out'
    })
  }
})

module.exports = router;
