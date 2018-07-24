
const Koa = require('koa')
const app = new Koa()
const { resolve } = require('path')
const R = require('ramda')

const setup = require('../setup/server')

const MIDDLEWARES = [
  'database',
  'interceptor',
  'third-party',
  'route'
]

;(async () => {
  R.map(
    R.compose(
      middleware => middleware(app),
      require,
      file => resolve(__dirname, 'middlewares/', file)
    )
  )(MIDDLEWARES)
})()

// MIDDLEWARES.map(p => {
//   const path = resolve(__dirname, 'middlewares/', p)
//   const middleware = require(path)
//   middleware(app)
// })

app.listen(setup.server.port, () => {
  console.log(`Start listen at: ${setup.server.port}`)
})
