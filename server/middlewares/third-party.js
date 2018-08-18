
const logger = require('koa-logger')

module.exports = app => {
  console.info('[INFO] loading third-party middlewares')
  app.use(logger())
}
