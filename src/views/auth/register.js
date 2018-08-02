
import React, { Component } from 'react'
import {
  WhiteSpace,
  List,
  Radio,
  Button,
  WingBlank,
  NoticeBar,
  Icon
} from 'antd-mobile'
import axios from 'axios'

import Logo from '../../components/logo'
import UsernameInput from '../../components/auth/username-input'
import EmailInput from '../../components/auth/email-input'
import PasswordInput from '../../components/auth/password-input'

const RadioItem = Radio.RadioItem

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      email: null,
      password: null,
      identity: 0,
      errorMsg: {
        username: null,
        email: null,
        password: null,
      },
    }
  }

  async setUserInfo(type, value) {
    await this.setState({
      [type]: value
    })
  }

  async checkValidation(type, value, errors) {
    await this.setUserInfo(type, value)
    await this.setState({
      errorMsg: {
        ...this.state.errorMsg,
        [type]: errors
      }
    })
  }

  signup() {
    console.log('Sign Up')
    const username = this.state.username
    const email = this.state.email
    const password = this.state.password
    const identity = this.state.identity
    axios.put('/api/user', {
      username,
      email,
      password,
      identity
    })
  }

  render() {
    const identities = [
      { value: 0, label: 'I\'m an Employer' },
      { value: 1, label: 'I\'m an Employee' }
    ]
    let notice = null
    let isFinishInput = false
    if(this.state.username && this.state.email && this.state.password) isFinishInput = true
    for(let error in this.state.errorMsg) {
      if(this.state.errorMsg[error] && this.state.errorMsg[error].length > 0) {
        notice = this.state.errorMsg[error][0]
        isFinishInput = false
        break
      }
    }
    const noticeBar = (
      <NoticeBar
        mode="closable"
        icon={<Icon type="check-circle-o" size="xxs" />}
      >{notice}</NoticeBar>
    )
    return (
      <div>
        <WingBlank>
          <Logo />
          <h2>Sign Up Page</h2>
          {notice ? noticeBar : null}
          <List
            renderHeader={() => 'Profile'}
          >
            <UsernameInput
              validator={this.checkValidation.bind(this)}
            />
            <EmailInput
              validator={this.checkValidation.bind(this)}
            />
            {identities.map(i => (
              <RadioItem
                key={i.value}
                checked={this.state.identity === i.value}
                onChange={() => this.setUserInfo('identity', i.value)}
              >
                {i.label}
              </RadioItem>
            ))}
            <PasswordInput
              validator={this.checkValidation.bind(this)}
            />
          </List>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={() => this.signup()}
            disabled={!isFinishInput}
          >
            Submit
          </Button>
          <WhiteSpace />
          <Button onClick={() => this.props.history.push('/login')}>Already had an account</Button>
          <WhiteSpace />
        </WingBlank>
      </div>
    )
  }
}
