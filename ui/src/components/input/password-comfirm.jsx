
import React from 'react'
import {
  InputItem,
  Toast
} from 'antd-mobile'

export default class PasswordComfirmInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.input = this.input.bind(this)
    this.repeat = this.repeat.bind(this)
    this.showErrors = this.showErrors.bind(this)
    this.state = {
      __p: ''
    }
  }

  errorChecker (v) {
    let errors = []
    if(v.length === 0) {
      errors.push('Please enter the password')
    }
    if(v.length < 8) {
      errors.push('Password must longer than 8 characters')
    }
    if(v.length > 32) {
      errors.push('Password must shorter than 32 characters')
    }
    if(!v.match(/^[a-zA-Z0-9_-]*$/)) {
      errors.push('Password should contains only letter and number')
    }
    return errors
  }

  passwordMatch(v, _v) {
    let errors = []
    if(v !== _v) {
      errors.push('Password did\'t match')
    }
    return errors
  }

  showErrors() {
    if(this.props.errors.length > 0) {
      Toast.info(this.props.errors[0])
    }
  }

  input(v) {
    const errors = this.errorChecker(v)
    const matchError = this.passwordMatch(v, this.state.__p)
    this.props.onChange(v, [...errors, ...matchError])
  }

  repeat(v) {
    const password = this.props.value ? this.props.value : ''
    this.setState({
      __p: v
    })
    const matchError = this.passwordMatch(this.props.value, v)
    const errors = this.errorChecker(password)
    this.props.onChange(password, [...errors, ...matchError])
  }

  render() {
    const errors = this.props.errors ? this.props.errors.length : false
    return (
      <div>
        <InputItem
          clear
          type="password"
          placeholder='Password'
          onChange={this.input}
          error={errors}
          onErrorClick={this.showErrors}
          value={this.props.value}
          disabled={this.props.locked}
        >
          Password:
        </InputItem>
        <InputItem
          clear
          type="password"
          placeholder='Repeat the password'
          onChange={this.repeat}
          error={errors}
          onErrorClick={this.showErrors}
          value={this.state.__p}
          disabled={this.props.locked}
        >
          Password:
        </InputItem>
      </div>
    )
  }
}
