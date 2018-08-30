
import mockingoose from 'mockingoose'
import '../db/schema/user.model'

const {
  findUserByType,
  register,
  update
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

  it('should add a new user to db and return it', async () => {
    const _doc = {
      username: 'testuser',
      password: '123456',
      email: 'test@gmail.com'
    }
    mockingoose.User
      .toReturn([], 'find')
      .toReturn(_doc, 'save')
    const user = await register(_doc)

    expect(user).toMatchObject(_doc)
  })

  it('should throw an error if any unique fields are duplicated', () => {
    const _doc = {
      username: 'testuser',
      password: '123456',
      email: 'test@gmail.com'
    }
    mockingoose.User
      .toReturn([_doc], 'find')
      .toReturn(_doc, 'save')
    register(_doc)
      .then(() => {
        // never been here
        expect(true).toBe(false)
      }).catch(error => {
        expect(error).toBe('username or email already exists')
      })
  })
})

describe('update tests', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  it('should had an _id field in parameter object', async () => {
    const _doc = {
      username: 'testuser',
      password: '123456'
    }
    try {
      await update(_doc)
      // never been here
      expect(false).toBe(true)
    } catch(error) {
      expect(error).toBe('Cannot found id field in passing in object')
    }
  })

  it('should reject if cannot find any user by the _id', async () => {
    const _doc = {
      _id: '123',
      username: 'testuser'
    }
    mockingoose.User.toReturn({n: 0, nModified: 0, ok: 1}, 'update')
    try {
      await update(_doc)
      // never been here
      expect(false).toBe(true)
    } catch(error) {
      expect(error).toBe('Cannot found any user match the id field')
    }
  })

  it('should resolve the result after processing', async () => {
    const _doc = {
      _id: '123',
      username: 'testuser'
    }
    mockingoose.User.toReturn({n: 1, nModified: 1, ok: 1}, 'update')
    try {
      const result = await update(_doc)
      expect(result.ok).toBe(1)
    } catch(error) {
      // never been here
      expect(false).toBe(true)
    }
  })
})
