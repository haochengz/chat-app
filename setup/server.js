
const url = process.env.NODE_ENV === 'production'
  ? 'http://chat.nerverland.tech'
  : 'http://localhost'

const port = process.env.NODE_ENV === 'production'
  ? null
  : 4000

module.exports = {
  server: {
    url: url,
    port: port
  }
}
