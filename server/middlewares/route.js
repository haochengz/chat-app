
const { resolve } = require('path')
const glob = require('glob')

module.exports = async app => {
  console.info('[INFO] loading router middleware')
  glob.sync(resolve(__dirname, '../routers/', '**/*.router.js'))
    .forEach(router => {
      const middleware = require(router)
      app
        .use(middleware.routes())
        .use(middleware.allowedMethods())
    })
  //
}
