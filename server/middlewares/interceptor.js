
const { resolve } = require('path')

const INTERCEPTORS = [
  'user-status'
]

module.exports = app => {
  INTERCEPTORS.map(interceptor => {
    const path = resolve(__dirname, '../interceptors', interceptor)
    app.use(require(path))
  })
}
