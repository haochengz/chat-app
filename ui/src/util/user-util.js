
import axios from 'axios'

export function queryExistenceOnServer(type, value) {
  return new Promise((resolve, reject) => {
    axios.get('/api/v1/user/' + type, {
      params: {
        [type]: value
      }
    })
    .then(res => {
      if(res.data.code === 0){
        reject(type)
      } else {
        resolve('ok')
      }
    }).catch(error => {
      reject('error')
    })
  })
}

export function signUpAs(user) {
  return axios.put('/api/v1/user', {
    username: user.username,
    email: user.email,
    password: user.password,
    identity: user.identity
  })
}
