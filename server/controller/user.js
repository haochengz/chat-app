
const mongoose = require('mongoose')
const User = mongoose.model('User')
const R = require('ramda')

exports.findUserByType = (type, value) => {
  return new Promise((resolve, reject) => {
    const ACCEPTED_FIELD = [
      '_id', 'username', 'email'
    ]
    if(!R.contains(type, ACCEPTED_FIELD)){
      reject('Unsupported field for query: ' + type)
    }
    User.findOne({
      [type]: value
    }).then(doc => {
      resolve(doc)
    }).catch(error => {
      reject(error)
    })
  })
}

exports.register = async registrant => {
  return new Promise((resolve, reject) => {
    User.find({
      $or: [
        {
          email: registrant.email
        },
        {
          username: registrant.username
        }
      ]
    }).then(res => {
      if(res && res.length === 0) {
        const user = new User(registrant)
        resolve(user.save())
      } else {
        reject('username or email already exists')
      }
    }).catch(error => {
      reject(error)
    })
  })
}

exports.update = async user => {
  try {
    const status = await User.update(
      {_id: user._id},
      {...user},
    )
    return status
  } catch(error) {
    console.error(error)
    return false
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
        msg: 'success',
        data: {
          user: userModel
        }
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
