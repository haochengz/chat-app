
const { resolve } = require('path')

const INTERCEPTORS = [
  'user-status'
]

module.exports = app => {
  return new Promise(reso => {
    console.info('[INFO] loading interceptors')
    INTERCEPTORS.forEach((interceptor, index) => {
      const path = resolve(__dirname, '../interceptors', interceptor)
      app.use(require(path))
      if(index + 1 === INTERCEPTORS.length) reso()
    })
  })
}
