
import axios from 'axios'

import { FETCH_USERS } from '../types.redux'

export const fetchUsers = () => dispatch => {
  axios.get('/api/v1/users')
    .then(result => {
      if(result.data.code === 0) dispatch({
        type: FETCH_USERS,
        payload: result.data.data
      })
    }).catch(error => {
      console.log(error)
    })
}
