
import React from 'react'
import { InputItem } from 'antd-mobile'

const ERRORS = [
  {
    check: (s) => {
      if (s.length) return true
      return false
    },
    msg: 'Please enter the password'
  },
  {
    check: (s) => {
      if (s.length < 8) return false
      return true
    },
    msg: 'Username must longer than 8 characters'
  },
  {
    check: (p1, p2) => {
      return p1 === p2
    },
    msg: 'Password are not match'
  }
]

export default class PasswordInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pwd1: '',
      pwd2: ''
    }
  }

  async handleChange() {
    const errors = []
    ERRORS.forEach(async (item, index, array) => {
      if(!await item.check(this.state.pwd1, this.state.pwd2)) {
        errors.push(item.msg)
      }
      if(index === (array.length - 1)) {
        this.props.validator('password', this.state.pwd1, errors)
      }
    })
  }

  async handleInput(type, v) {
    await this.setState({
      [type]: v
    })
    await this.handleChange()
  }

  render() {
    return (
      <div>
        <InputItem
          type="password"
          clear
          placeholder='Username'
          onChange={this.handleInput.bind(this, 'pwd1')}
          error={this.props.errorMsg}
        >
          Password
        </InputItem>
        <InputItem
          type="password"
          clear
          placeholder='Repeat the password'
          onChange={this.handleInput.bind(this, 'pwd2')}
          error={this.props.errorMsg}
        >
          Repeat Password
        </InputItem>
      </div>
    )
  }
}
