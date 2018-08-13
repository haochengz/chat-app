
import axios from 'axios'

import {
  LOGIN
} from '../types.redux'

// automatically login
export const login = () => dispatch => {
  //
}

// signing in from sign in page
export const signin = (username, password) => dispatch => {
  axios.post('/api/user', {
    username,
    password
  }, res => {
    console.log(res)
    dispatch(LOGIN, )
  })
}

export const logout = () => dispatch => {
  //
}
