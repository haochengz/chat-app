
import mockingoose from 'mockingoose'
import '../db/schema/user.model'

const {
  findUserByType
} = require('./user')

describe('findUserType tests', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  it('should find a user by its username', async () => {
    mockingoose.User.toReturn({
      username: 'testuser'
    }, 'findOne')

    let user = await findUserByType('username', 'testuser')
    expect(user).toMatchObject({username: 'testuser'})
  })

  it('should returns a null value if no document were find', async () => {
    mockingoose.User.toReturn(null, 'findOne')

    let user = await findUserByType('username', 'testuser')
    expect(user).toBeFalsy()
  })

  it('should only accept _id, username, email as the type', async () => {
    try {
      await findUserByType('_id', '123')
      await findUserByType('username', '123')
      await findUserByType('email', '123')
    } catch(error) {
      // never been here
      expect(true).toBe(false)
    }
  })

  it('should throw an error if the type parameter are not _id, username or email', async () => {
    try {
      await findUserByType('password', '123')
      // never been here
      expect(true).toBe(false)
    } catch(error) {
      expect(error).toBe('Unsupported field for query: password')
    }
  })
})

describe('register tests', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  // should
})
