
const helper = require('./helper')

describe('helper function waitForEach test', () => {
  const mockCb = jest.fn()
  mockCb.mockResolvedValue()
  helper.waitForEach(mockCb, [1, 2, 3])

  it('should calling mockCb 3 times', () => {
    expect(mockCb.mock.calls.length).toBe(3)
  })

  it('should be this argument for first recursive call', () => {
    expect(mockCb.mock.calls[0][0]).toBe(1)
  })

  it('should be these arguments for the rest of the resursive calls', () => {
    expect(mockCb.mock.calls[1][0]).toBe(2)
    expect(mockCb.mock.calls[2][0]).toBe(3)
  })

  it('should run async', async () => {
    function loading(item){
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(item, 'are done')
          resolve()
        }, 2000)
      })
    }
    helper.waitForEach(loading, [1, 2, 3])
  })
})
