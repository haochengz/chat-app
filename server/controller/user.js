
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.findUserByType = async (type, value) => {
  const code = await User.findOne({
    [type]: value
  })
  return code
}

exports.register = async (registrant) => {
  const status = await User.find({
    $or: [
      {
        email: registrant.email
      },
      {
        useranem: registrant.username
      }
    ]
  })
  if(status.length > 0) {
    return false
  } else {
    const user = new User(registrant)
    await user.save()
    return user
  }
}
