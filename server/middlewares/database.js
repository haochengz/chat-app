
const connect = require('../db/init')

module.exports = async () => {
  return new Promise((resolve, reject) => {
    connect()
      .then(status => {
        console.info('[INFO -> middleware loader] ' + status)
        resolve(status)
      })
      .catch(error => {
        console.error('[ERROR -> middleware loader] Database connection failed')
        reject(error)
      })
  })
}
