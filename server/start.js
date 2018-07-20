
const Koa = require('koa')
const app = new Koa()
const setup = require('../setup/server')

app.listen(setup.server.port, () => {
  console.log(`Start listen at: ${setup.server.port}`)
})
