
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.findUserByType = async (type, value) => {
  const code = await User.findOne({
    [type]: value
  })
  return code
}

exports.register = async registrant => {
  const status = await User.find({
    $or: [
      {
        email: registrant.email
      },
      {
        username: registrant.username
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

exports.auth = async user => {
  const userModel = await User.findOne({
    $or: [
      {
        email: user.email
      },
      {
        username: user.username
      }
    ]
  })
  try {
    let status = false
    status = await User.comparePassword(user.password, userModel.password)
    if(status) {
      return {
        code: 0,
        msg: 'success'
      }
    } else {
      return {
        code: 1,
        msg: 'wrong username or password'
      }
    }
  } catch(error) {
    return {
      code: -1,
      msg: 'server or database failure',
      error: error
    }
  }
}
