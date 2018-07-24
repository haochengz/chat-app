
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.findUserByUsername = async username => {
  const code = await User.findOne({
    username: username
  })
  return code
}
