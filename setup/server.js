
const serverUrl = process.env.NODE_ENV === 'production'
  ? 'http://chat.nerverland.tech'
  : 'http://localhost'

const serverPort = process.env.NODE_ENV === 'production'
  ? null
  : 4000

module.exports = {
  server: {
    url: serverUrl,
    port: serverPort
  }
}
