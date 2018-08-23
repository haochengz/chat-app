
import axios from 'axios'

import {
  LOGIN,
  LOGOUT,
  UPDATE
} from '../types.redux'

export const login = (username, password) => dispatch => {
  axios.post('/api/v1/user', {
    username: username,
    password: password
  }).then(result => {
    if(result.data.code === 0) {
      dispatch({
        type: LOGIN,
        payload: result.data.data.user
      })
    }
  }).catch(error => {
    console.log(error)
  })
}

export const signin = () => dispatch => {
  axios.get('/api/v1/user')
    .then(result => {
      if(result.data.code === 0) {
        dispatch({
          type: LOGIN,
          payload: result.data.data.user
        })
      }
  }).catch(error => {
    console.log(error)
  })
}

export const signout = () => dispatch => {
  axios.delete('/api/v1/user')
    .then(result => {
      if(result.data.code === 0) {
        dispatch({
          type: LOGOUT
        })
      }
    }).catch(error => {
      console.log(error)
    })
}

export const update = user => dispatch => {
  axios.patch('/api/v1/user', user)
    .then(result => {
      if(result.data.code === 0) {
        dispatch({
          type: UPDATE,
          payload: user
        })
      }
    }).catch(error => {
      console.log(error)
    })
}
