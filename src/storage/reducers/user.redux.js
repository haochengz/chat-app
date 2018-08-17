
import {
  LOGIN,
  LOGOUT
} from '../types.redux'

const userInitState = {
  hasLogin: false,
  username: null,
  email: null,
  identity: null
}

function user(state=userInitState, action) {
  switch(action.type) {
    case LOGIN:
      const loginUser = action.payload
      return {
        ...state,
        hasLogin: true,
        username: loginUser.username,
        email: loginUser.email,
        identity: loginUser.identity
      }
    case LOGOUT:
      return userInitState
    default:
      return state
  }
}

export default user
