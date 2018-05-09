const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {type:String, unique: true, required: true},
  password: {type: String, required: true},
  first_name: String,
  last_name: String,
  offers: [{post_id: String, post_title:String, offer:Number}]
})

const User = mongoose.model('User', userModel);

module.exports = User;
