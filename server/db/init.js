
const mongoose = require('mongoose')
const db = require('../../setup/database')

mongoose.Promise = global.Promise

const dbConn = `mongodb://${db.user}:${db.pwd}@${db.host}:${db.port}/${db.name}`

exports.connect = () => {
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
