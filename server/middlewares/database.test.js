
import load from './database'
import connect from '../db/init'
jest.mock('../db/init')

describe('loading database by standart middleware way', () => {
  it('should success if connected to database', async () => {
    connect.mockResolvedValue('OK')
    global.console = {
      info: jest.fn()
    }
    const status = await load()

    expect(status).toBe('OK')
    expect(console.info).toBeCalled()
  })

  it('should fail if connect rejected connection request', async () => {
    connect.mockRejectedValue('FAIL')
    global.console = {
      error: jest.fn()
    }
    try {
      await load()
    } catch(error) {
      expect(error).toBe('FAIL')
      expect(console.error).toBeCalled()
    }
  })
})