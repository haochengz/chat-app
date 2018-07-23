
import axios from 'axios'

const userInitState = {
  username: null,
  email: null,
  identity: null
}

export function user(state=userInitState, action) {
  switch(action.type) {
    case 'ADD':
      return state + 1
    case 'MINUS':
      return state - 1
    default:
      return state
  }
}

function register(username, password, identity) {
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
