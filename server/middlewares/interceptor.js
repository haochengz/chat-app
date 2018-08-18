
const { resolve } = require('path')

const INTERCEPTORS = [
  'user-status'
]

module.exports = app => {
  console.info('[INFO] loading interceptor middlewares')
  INTERCEPTORS.forEach(interceptor => {
    const path = resolve(__dirname, '../interceptors', interceptor)
    app.use(require(path))
  })
}
