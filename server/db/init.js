
const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = require('../../setup/database')

mongoose.Promise = global.Promise

const dbConn = `mongodb://${db.user}:${db.pwd}@${db.host}:${db.port}/${db.name}`

const initSchema = function() {
  console.log('[INFO] Initializing data schemas')
  glob.sync(resolve(__dirname, 'schema', '**/*.js'))
    .forEach(require)
}

const initAdmin = async function() {
  console.log('[INFO] Initializing admin account')
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

const connect = function() {
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
    mongoose.connection.once('open', async () => {
      await initSchema()
      await initAdmin()
      resolve('DB-OK')
    })
  })
}

module.exports = connect

