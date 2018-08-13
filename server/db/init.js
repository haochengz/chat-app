
const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = require('../../setup/database')

mongoose.Promise = global.Promise

const dbConn = `mongodb://${db.user}:${db.pwd}@${db.host}:${db.port}/${db.name}`

exports.initSchema = function() {
  glob.sync(resolve(__dirname, 'schema', '**/*.js'))
    .forEach(require)
}

// exports.initSchema = function() {
//   return new Promise((res, rej) => {
//     glob.sync(resolve(__dirname, 'schema', '**/*.js'))
//       .forEach((file, index, files) => {
//         require(file)
//         if(index === files.length - 1) res('OK')
//       })
//   })
// }

exports.initAdmin = async function() {
  const User = mongoose.model('User')
  const admin = db.admin
  if (await User.findOne({ username: admin.username })) return
  const administrator = new User({
    username: admin.username,
    email: admin.email,
    password: admin.password
  })
  await administrator.save()
}

exports.connect = function() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(dbConn, {
      useNewUrlParser: true
    })

    mongoose.connection.on('disconnected', () => {
      reject('DB-LOST-CONNECTION')
    })
    mongoose.connection.on('error', () => {
      reject('DB-ERROR')
    })
    mongoose.connection.once('open', () => {
      resolve('DB-OK')
    })
  })
}
