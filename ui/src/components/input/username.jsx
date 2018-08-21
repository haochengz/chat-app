
import React from 'react'
import {
  InputItem,
  Toast
} from 'antd-mobile'

export default class UsernameInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.input = this.input.bind(this)
    this.showErrors = this.showErrors.bind(this)
  }

  errorChecker(v) {
    let errors = []
    if(v.length === 0) {
      errors.push('Please enter a username')
    }
    if(v.length < 6) {
      errors.push('Username must longer than 6 characters')
    }
    if(v.length > 32) {
      errors.push('Username must shorter than 32 characters')
    }
    if(!v.match(/^[a-zA-Z0-9_-]*$/)) {
      errors.push('Username should contains only letter and number')
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
    this.props.onChange(v, errors)
  }

  render() {
    return (
      <InputItem
        clear
        placeholder='Username'
        onChange={this.input}
        error={this.props.errors.length}
        onErrorClick={this.showErrors}
        value={this.props.value}
        disabled={this.props.locked}
      >
        Username:
      </InputItem>
    )
  }
}
