
const { findUserByType } = require('../controller/user')

module.exports = async (ctx, next) => {
  // request interceptor
  console.log('Comming request')
  const userId = ctx.cookies.get('__userid')
  try {
    const user = await findUserByType('_id', userId)
    if(user) {
      ctx.user = user
    } else {
      ctx.user = undefined
    }
  } catch(error) {
    ctx.user = undefined
  }
  await next()
  // response interceptor
  console.log('Responding')
}
