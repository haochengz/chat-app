
module.exports = async (ctx, next) => {
  // request interceptor
  console.log('Comming request')
  await next()
  // response interceptor
  console.log('Responding')
}
