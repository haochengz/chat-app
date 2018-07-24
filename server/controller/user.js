
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.findUserByType = async (type, value) => {
  const code = await User.findOne({
    [type]: value
  })
  return code
}
