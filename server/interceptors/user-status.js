
module.exports = (ctx, next) => {
  console.log(ctx)
  // request interceptor
  ctx.status = 200
  ctx.response.type = 'JSON'
  ctx.body = {
    data: {
      code: 1
    }
  }
  next()
  // response interceptor
}
