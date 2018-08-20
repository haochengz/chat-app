
require('./start')

describe('start the server', () => {
  // It's a canary test
  it('should starts when start.js was required or executed', () => {
    expect(5).toBe(5)
  })
})
