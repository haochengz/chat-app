
const Router = require('koa-router')
const userRouter = new Router()
const { findUserByUsername } = require('../controller/user')

userRouter.get('/api/user/query/username/:username', async (ctx, next) => {
  const user = await findUserByUsername(ctx.params.username)
  const code = user ? 0 : -1
  console.log('code: ', code)
  ctx.body = {
    code: code
  }
})

userRouter.get('/api/user/query/email/:email', (ctx, next) => {})

module.exports = userRouter
