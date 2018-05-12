const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
  user_id: String,
  name: String,
  title: String,
  description: String,
  location: String,
  date: String,
  total: Boolean,
  hourly: Boolean,
  budget: Number,
  people: Number,
  offers: [{user_id:String, name: String, budget: Number, total: Boolean}],
  accepted: [{user_id: String, name: String, budget: Number, total: Boolean}],
  completed: {type: Boolean, default: false}
}, {timestamps: true})

const Post = mongoose.model('Post', postModel);

module.exports = Post;
