
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
        user.save().then(x => resolve(x))
      } else {
        reject('username or email already exists')
      }
    }).catch(error => {
      reject(error)
    })
  })
}

exports.update = async user => {
  return new Promise((resolve, reject) => {
    if(!('_id' in user)) reject('Cannot found id field in passing in object')
    User.update(
      {_id: user._id},
      {...user},
    ).then(res => {
      if(res.n === 0) reject('Cannot found any user match the id field')
      resolve(res)
    }).catch(error => reject(error))
  })
}

exports.auth = user => {
  return new Promise((resolve, reject) => {
    User.findOne({
      $or: [
        {
          email: user.email
        },
        {
          username: user.username
        }
      ]
    }).then(found => {
      if(found) {
        return found.comparePassword(user.password)
      } else {
        reject('wrong username or password mark i')
      }
    }).then(result => {
      if(result) {
        resolve('ok')
      } else {
        reject('wrong username or password mark ii')
      }
    }).catch(error => {
      console.error(error)
      reject('something wrong with the database or connection')
    })
  })
}
