
const load = require('./cookie')
import session from 'koa-session'
jest.mock('koa-session')

describe('test cookie middleware loader is standard loader for server', () => {
  it('should calling use method from parameter app', () => {
    const app = {
      use: jest.fn()
    }
    session.mockResolvedValue(1)
    global.console = {
      info: jest.fn()
    }
    load(app)

    expect(app.use.mock.calls.length).toBe(1)
    expect(console.info).toBeCalled()
  })
})