
const { connect, initSchema, initAdmin } = require('../db/init')

module.exports = async app => {
  connect()
  initSchema()
  await initAdmin()
}
