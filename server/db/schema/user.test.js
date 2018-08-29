
import mockingoose from 'mockingoose'
import model from './user.model'

describe('test mongoose User model', () => {
  it('should return the doc with findById()', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'testuser',
      email: 'testuser@gmail.com'
    }
    mockingoose.User.toReturn(_doc, 'findOne')
    
    return model
      .findById({ _id: '507f191e810c19729de860ea'})
      .then(doc => {
        return {
          _id: doc._id,
          username: doc.username,
          email: doc.email
        }
      })
      .then(result => {
        expect(JSON.parse(JSON.stringify(result))).toMatchObject(_doc)
      })
  })
})

describe('test user model method: compare password', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  it('should return true if password was match', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: '123456'
    }
    mockingoose.User.toReturn(_doc, 'save')

    return model
      .create(_doc)
      .then(doc => {
        if(doc.comparePassword('123456')) {
          return true
        } else {
          return false
        }
      }).then(result => {
        expect(result).toBe(true)
      })
  })
  it('should return false if password was match', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: '123456'
    }
    mockingoose.User.toReturn(_doc, 'save')

    return model
      .create(_doc)
      .then(doc => {
        if(doc.comparePassword('1234567')) {
          return true
        } else {
          return false
        }
      }).then(result => {
        expect(result).toBe(true)
      })
  })
})
