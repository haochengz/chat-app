
import React from 'react'
import {
  InputItem,
  Toast
} from 'antd-mobile'
import Isemail from 'isemail'

export default class EmailInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.input = this.input.bind(this)
    this.showErrors = this.showErrors.bind(this)
  }

  errorChecker(v) {
    let errors = []
    if(v.length === 0) {
      errors.push('Please enter a email')
    }
    if(!Isemail.validate(v)) {
      errors.push('Please enter an valid email address')
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
    const errors = this.props.errors ? this.props.errors.length : false
    return (
      <InputItem
        clear
        placeholder='Email'
        onChange={this.input}
        error={errors}
        onErrorClick={this.showErrors}
        value={this.props.value}
        disabled={this.props.locked}
      >
        Email:
      </InputItem>
    )
  }
}
