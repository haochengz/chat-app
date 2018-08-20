
const url = process.env.NODE_ENV === 'production'
  ? 'localhost'
  : 'localhost'

const port = process.env.NODE_ENV === 'production'
  ? '27017'
  : '27017'

module.exports = {
  host: url,
  port: port,
  name: 'chat',
  user: 'dev',
  pwd: '123456',
  admin: {
    username: 'haochengzhao',
    email: 'haochengzhao@outlook.com',
    password: '123456'
  }
}
