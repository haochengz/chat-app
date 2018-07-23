
const { connect } = require('../db/init')

module.exports = async app => {
  try {
    const status = await connect()
    console.log(status)
  } catch(err) {
    console.log(err)
  }
}
