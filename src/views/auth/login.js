
import React, { Component } from 'react'
import {
  WhiteSpace,
  Button,
  WingBlank,
  List,
  InputItem
} from 'antd-mobile'

import Logo from '../../components/logo'

export default class Login extends Component {
  signin() {
    console.log('Sign in')
  }
  render() {
    return (
      <WingBlank>
        <Logo />
        <List>
          <InputItem clear placeholder='Username'>Username:</InputItem>
          <InputItem clear placeholder='Password'>Password:</InputItem>
        </List>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={() => this.signin()}
        >
          Sign In
        </Button>
        <WhiteSpace />
        <Button
          onClick={() => this.props.history.push('/register')}
          type="warning"
        >
          Don&apos;t have an account, sign up for free
        </Button>
        <WhiteSpace />
      </WingBlank>
    )
  }
}
