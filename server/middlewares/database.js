
const connect = require('../db/init')

module.exports = async app => {
  try {
    var status = await connect()
    console.info('[INFO] ' + status)
  } catch(error) {
    console.error('[ERROR] Database connection failed')
    console.error(error)
  }
  return status
}
