
import load from './interceptor'

describe('loading interceptors by standart middleware way', () => {
  it('should success if connected to database', async () => {
    const app = {
      use: jest.fn()
    }
    global.console = {
      info: jest.fn()
    }
    await load(app)

    expect(require.mock.calls.length).toBe(1)
    expect(console.info).toBeCalled()
  })
})