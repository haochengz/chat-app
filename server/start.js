
const Koa = require('koa')
const app = new Koa()
const { resolve } = require('path')
const { afterAllWithWaitForEach } = require('./utils/helper')

const setup = require('../setup/server')

const MIDDLEWARES = [
  'database',
  'cookie',
  'third-party',
  'interceptor',
  'route'
]

// TODO: test middleware loading failure

const middlewares = MIDDLEWARES.map(fileName => resolve(__dirname, 'middlewares/', fileName))
const loadMiddleware = async filePath => {
  const middleware = require(filePath)
  try {
    await middleware(app)
    console.info('[INFO] Loading complete')
  } catch(error) {
    console.error('[ERROR] A middleware was failed to apply')
    console.error(error)
  }
}

console.info('[INFO] server starts')

;(async () => {
  await afterAllWithWaitForEach(loadMiddleware, middlewares, () => {
    app.listen(setup.server.port, () => {
      // TODO: all middlewares were loaded to server
      // shows the status of these middlewares
      console.log(`Start listen at: ${setup.server.port}`)
    })
  })
})()
