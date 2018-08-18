
const session = require('koa-session')

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}

module.exports = app => {
  console.info('[INFO] loading session middleware')
  app.use(session(CONFIG, app))
}