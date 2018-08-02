
const Router = require('koa-router')
const koaBody = require('koa-body')
const userRouter = new Router()
const {
  findUserByType,
  register
} = require('../controller/user')

userRouter.get('/api/user/query/username/:username', async (ctx, next) => {
  const user = await findUserByType('username', ctx.params.username)
  const code = user ? 0 : -1
  console.log('code: ', code)
  console.log('user: ', user)
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

userRouter.put('/api/user', koaBody(), async (ctx, next) => {
  const registrant = ctx.request.body
  const status = await register(registrant)
  if(status) {
    ctx.body = {
      code: 0,
      user: status
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

module.exports = userRouter
