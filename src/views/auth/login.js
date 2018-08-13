
import React, { Component } from 'react'
import {
  WhiteSpace,
  Button,
  WingBlank,
  List,
  InputItem
} from 'antd-mobile'
import { connect } from 'react-redux'
import axios from 'axios'

import Logo from '../../components/logo'
import {
  signin
} from '../../storage/actions/user.redux'

@connect(state => ({user: state.user}), {signin})
export default class Login extends Component {
  componentDidMount() {
    axios.post('/api/user', {
      username: 'jackma',
      password: 'abc8383815423'
    })
  }
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
