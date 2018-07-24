
const Router = require('koa-router')
const userRouter = new Router()
const { findUserByType } = require('../controller/user')

userRouter.get('/api/user/query/username/:username', async (ctx, next) => {
  const user = await findUserByType('username', ctx.params.username)
  const code = user ? 0 : -1
  console.log('code: ', code)
  ctx.body = {
    code: code
  }
})

userRouter.get('/api/user/query/email/:email', async (ctx, next) => {
  const user = await findUserByType('email', ctx.params.email)
  const code = user ? 0 : -1
  console.log('code: ', code)
  ctx.body = {
    code: code
  }
})

module.exports = userRouter
