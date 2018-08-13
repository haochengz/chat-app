
import axios from 'axios'
import {
  LOGIN
} from '../types.redux'

const userInitState = {
  hasLogin: false,
  username: null,
  email: null,
  identity: null
}

export default function user(state=userInitState, action) {
  switch(action.type) {
    case LOGIN:
      return state + 1
    case 'MINUS':
      return state - 1
    default:
      return state
  }
}

export function register(username, password, identity) {
  axios.put('/api/user', {
    username,
    password,
    identity
  }).then(res => {
    console.log(res)
  }).catch(error => {
    console.log(error)
  })
}
