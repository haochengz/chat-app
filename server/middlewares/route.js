
const { resolve } = require('path')
const glob = require('glob')

module.exports = async app => {
  console.log('loading router middleware')
  glob.sync(resolve(__dirname, '../routers/', '**/*.js'))
    .forEach(router => {
      const middleware = require(router)
      app
        .use(middleware.routes())
        .use(middleware.allowedMethods())
    })
  //
}
