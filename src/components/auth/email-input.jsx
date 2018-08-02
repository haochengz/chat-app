
import React from 'react'
import { InputItem } from 'antd-mobile'
import axios from 'axios'
import Isemail from 'isemail'

const ERRORS = [
  {
    check: (s) => {
      if (s.length) return true
      return false
    },
    msg: 'Please enter a email'
  },
  {
    check: (s) => {
      if (!Isemail.validate(s)) return false
      return true
    },
    msg: 'Please enter a valid email address'
  },
  {
    check: (s) => {
      return new Promise((resolve, reject) => {
        if(!s) resolve(false)
        axios.get('/api/user/query/email/' + s)
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
    msg: 'This email address already been taken, please enter another one'
  }
]

export default class EmailInput extends React.Component {

  async handleChange(v) {
    const errors = []
    ERRORS.forEach(async (item, index, array) => {
      if(!await item.check(v)) {
        errors.push(item.msg)
      }
      if(index === (array.length - 1)) {
        this.props.validator('email', v, errors)
      }
    })
  }

  render() {
    return (
      <InputItem
        clear
        placeholder='Email'
        onChange={this.handleChange.bind(this)}
        error={this.props.errorMsg}
      >
        Email
      </InputItem>
    )
  }
}
