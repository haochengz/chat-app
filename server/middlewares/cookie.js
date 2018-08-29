
import session from 'koa-session'

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}

module.exports = async app => {
  console.info('[INFO] loading session middleware')
  await app.use(session(CONFIG, app))
}