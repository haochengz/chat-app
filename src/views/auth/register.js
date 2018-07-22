
import React, { Component } from 'react'
import {
  WhiteSpace,
  List,
  InputItem,
  Radio,
  Button,
  WingBlank
} from 'antd-mobile'

import Logo from '../../components/logo'

const RadioItem = Radio.RadioItem

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      email: null,
      password1: null,
      password2: null,
      identity: null
    }
  }

  setIdentity(identity) {
    this.setState({
      identity
    })
  }

  signup() {
    console.log('Sign Up')
  }

  render() {
    const identities = [
      { value: 0, label: 'I\'m an Employer' },
      { value: 1, label: 'I\'m an Employee' }
    ]
    let {
      username,
      email,
      password1,
      password2,
      identity
    } = this.state
    return (
      <WingBlank>
        <Logo />
        <h2>Sign Up Page</h2>
        <List
          renderHeader={() => 'Profile'}
        >
          <InputItem
            clear
            placeholder='Username'
          >
            Username:
          </InputItem>
          <InputItem
            clear
            placeholder='Email'
          >
            Email:
          </InputItem>
          {identities.map(i => (
            <RadioItem
              key={i.value}
              checked={identity === i.value}
              onChange={() => this.setIdentity(i.value)}
            >
              {i.label}
            </RadioItem>
          ))}
          <InputItem
            clear
            placeholder='Password'
          >
            Password:
          </InputItem>
          <InputItem
            clear
            placeholder='Repeat Password'
          >
            Password:
          </InputItem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={() => this.signup()}>Submit</Button>
        <WhiteSpace />
        <Button onClick={() => this.props.history.push('/login')}>Already had an account</Button>
        <WhiteSpace />
      </WingBlank>
    )
  }
}
