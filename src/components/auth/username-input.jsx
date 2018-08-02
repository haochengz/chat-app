
import React from 'react'
import { InputItem } from 'antd-mobile'
import axios from 'axios'

const ERRORS = [
  {
    check: (s) => {
      if (s.length) return true
      return false
    },
    msg: 'Please enter a username'
  },
  {
    check: (s) => {
      if (s.length < 6) return false
      return true
    },
    msg: 'Username must longer than 6 characters'
  },
  {
    check: (s) => {
      return new Promise((resolve, reject) => {
        if(!s) resolve(false)
        axios.get('/api/user/query/username/' + s)
          .then(res => {
            if(res.data.code === 0) {
              resolve(false)
            }
            resolve(true)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    msg: 'Username already been taken, please enter another one'
  }
]

export default class UsernameInput extends React.Component {

  async handleChange(v) {
    const errors = []
    ERRORS.forEach(async (item, index, array) => {
      if(!await item.check(v)) {
        errors.push(item.msg)
      }
      if(index === (array.length - 1)) {
        this.props.validator('username', v, errors)
      }
    })
  }

  render() {
    return (
      <InputItem
        clear
        placeholder='Username'
        onChange={this.handleChange.bind(this)}
        error={this.props.errorMsg}
      >
        Username
      </InputItem>
    )
  }
}
