
const Router = require('koa-router')

const { findAllUsers } = require('../controller/users')

const usersRouter = new Router()
usersRouter.prefix('/api/v1/users')

usersRouter.get('/', async (ctx, next) => {
  console.log('users')
  try {
    const users = await findAllUsers()
    ctx.body = {
      code: 0,
      data: users
    }
    return next()
  } catch(error) {
    console.log(error)
    ctx.body = {
      code: -1
    }
    return next()
  }
})

module.exports = usersRouter
