
import React from 'react'
import {
  WhiteSpace,
  Button,
  WingBlank,
  List,
  InputItem
} from 'antd-mobile'
import { connect } from 'react-redux'

import Logo from '../logo'
import {
  login
} from '../../storage/actions/user.redux'

@connect(
  state => ({user: state.user}),
  { login }
)
class SigninView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  onInput(type, value) {
    this.setState({
      [type]: value
    })
  }

  signin() {
    this.props.login(
      this.state.username,
      this.state.password
    )
    this.props.history.push('/')
  }

  render() {
    return (
      <WingBlank>
        <Logo />
        <List>
          <InputItem
            clear
            placeholder="Username"
            onChange={this.onInput.bind(this, 'username')}
            value={this.state.username}
          >
            Username:
          </InputItem>
          <InputItem
            clear
            type="password"
            placeholder="Password"
            onChange={this.onInput.bind(this, 'password')}
            value={this.state.password}
          >
            Password:
          </InputItem>
        </List>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={this.signin.bind(this)}
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

export default SigninView
