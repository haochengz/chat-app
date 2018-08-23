
import {
  LOGIN,
  LOGOUT,
  UPDATE
} from '../types.redux'

const userInitState = {
  _id: null,
  hasLogin: false,
  username: null,
  email: null,
  identity: null,
  cv: '',
  positions: '',
  avatar: ''
}

function user(state=userInitState, action) {
  switch(action.type) {
    case LOGIN:
      const loginUser = action.payload
      return {
        ...state,
        hasLogin: true,
        _id: loginUser._id,
        username: loginUser.username,
        email: loginUser.email,
        identity: loginUser.identity,
        cv: loginUser.cv,
        positions: loginUser.positions,
        avatar: loginUser.avatar
      }
    case LOGOUT:
      return userInitState
    case UPDATE:
      return action.payload
    default:
      return state
  }
}

export default user
