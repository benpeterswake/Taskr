const express = require('express')
const router = express.Router();
const Post = require('../models/post.js');

router.get('/', (req, res) => {
    if(req.session.currentUser){
      Post.find({user_id: req.session.currentUser._id}, (err, userPosts) => {
        if(err){
          console.log(err);
          res.json({error: "error"})
        }else{
          console.log(userPosts);
          res.json({posts: userPosts, success: "Found posts"})
        }
      })
    }else{
      res.json({
        auth: 'logged out'
      })
    }
});

router.put('/', (req, res) => {
  if(req.session.currentUser){
    Post.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err, updatedPost) => {
      if(err){
        console.log(err);
        res.json({error: "error"})
      }else{
        console.log(updatedPost);
        res.json({post: updatedPost, success: "Updated post"})
      }
    })
  }else{
    res.json({
      auth: 'logged out'
    })
  }
})

router.get('/recent', (req, res) => {
    Post.find({}, (err, posts) => {
      if(err){
        console.log(err);
        res.json({error: "error"})
      }else{
        console.log(posts);
        res.json({posts: posts, success: "Found all posts"})
      }
    }).limit(8).sort('-createdAt')
});

router.post('/', (req, res) => {
    if(req.session.currentUser){
      req.body.user_id = req.session.currentUser;
      console.log(req.body)
      Post.create(req.body, (err, post) => {
        if(err){
          console.log(err);
          res.json({error: "Post failed!"})
        }else{
          console.log(post);
          res.json({success: "Post created!"})
        }
      })
    }else{
      res.json({
        auth: 'logged out'
      })
    }
});


module.exports = router;
