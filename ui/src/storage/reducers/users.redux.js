
import { FETCH_USERS } from '../types.redux'

const usersInitState = []

function users(state=usersInitState, action) {
  switch(action.type) {
    case FETCH_USERS:
      return action.payload
    default:
      return state
  }
}

export default users
