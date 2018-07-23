
const Koa = require('koa')
const app = new Koa()
const { resolve } = require('path')

const setup = require('../setup/server')

const MIDDLEWARES = [
  'database',
  'interceptor'
]

MIDDLEWARES.map(p => {
  const path = resolve(__dirname, 'middlewares/', p)
  const middleware = require(path)
  middleware(app)
})

app.listen(setup.server.port, () => {
  console.log(`Start listen at: ${setup.server.port}`)
})
