
const Router = require('koa-router')
const koaBody = require('koa-body')
const userRouter = new Router()
userRouter.prefix('/api/v1/user')

const {
  findUserByType,
  register,
  update,
  auth
} = require('../controller/user')

// GET /api/v1/user/username, query {username: ${username}}
// return {code: 0 | -1 | 1, msg: success, fail, cannot find }
userRouter.get('/username', async (ctx, next) => {
  const { username } = ctx.query
  try {
    const user = await findUserByType('username', username)
    const code = user ? 0 : 1
    const msg = user ? 'success' : 'cannot find user'
    ctx.body = {
      code: code,
      msg: msg
    }
  } catch(error) {
    console.error(error)
    ctx.body = {
      code: -1,
      msg: 'database or connection fail'
    }
  }
  return next()
})

// GET /api/v1/user/email, query {email: ${email}}
// return {code: 0 | -1 | 1, msg: success, fail, cannot find }
userRouter.get('/email', async (ctx, next) => {
  const { email } = ctx.query
  try {
    const user = await findUserByType('email', email)
    const code = user ? 0 : 1
    const msg = user ? 'success' : 'cannot find user'
    ctx.body = {
      code: code,
      msg: msg
    }
    return next()
  } catch(error) {
    console.log(error)
    console.log('Database query failed')
    ctx.body = {
      code: -1,
      msg: 'database or connection fail'
    }
    return next()
  }
})

// GET /api/v1/user
// return {code: 0 | -1 | 1, msg: success, fail, cannot find }
// returns a data object contains user information if query successful
userRouter.get('/', async (ctx, next) => {
  if(ctx.user) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        user: ctx.user
      }
    }
  } else {
    ctx.body = {
      code: 1,
      msg: 'cannot find user'
    }
  }
  return next()
})

userRouter.post('/', koaBody(), async (ctx, next) => {
  const user = ctx.request.body
  const result = await auth(user)
  if(result.code === 0) {
    ctx.cookies.set('__userid', result.data.user._id)
    ctx.user = result.data.user
  }
  ctx.body = result
  return next()
})

userRouter.put('/', koaBody(), async (ctx, next) => {
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
  return next()
})

userRouter.patch('/', koaBody(), async (ctx, next) => {
  // TODO: requiring signed in
  // TODO: _id field is constant
  const user = ctx.request.body
  const status = await update(user)
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
  return next()
})

userRouter.delete('/', (ctx, next) => {
  ctx.cookies.set('__userid', '')
  ctx.body = {
    code: 0
  }
  return next()
})

module.exports = userRouter
