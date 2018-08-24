
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.findAllUsers = async () => {
  const users = User.find({})
  return users
}
