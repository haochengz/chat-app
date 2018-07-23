
import React, { Component } from 'react'
import {
  WhiteSpace,
  List,
  InputItem,
  Radio,
  Button,
  WingBlank,
  NoticeBar,
  Icon
} from 'antd-mobile'

import Logo from '../../components/logo'
import { checkRegisterInput } from '../../util/helper'

const RadioItem = Radio.RadioItem

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      email: null,
      password1: null,
      password2: null,
      identity: 0,
      errorMsg: {
        username: null,
        email: null,
        password: null,
      },
      isFinishInput: false,
    }
  }

  checkFinish() {
    let isFinish = true
    const fields = [
      'username',
      'email',
      'password1',
      'password2'
    ]
    fields.map(v => {
      if(this.state[v] === null) {
        isFinish = false
      }
    })
    const errors = this.state.errorMsg
    for(let k in errors) {
      if(errors[k]) {
        isFinish = false
      }
    }
    this.setState({
      isFinishInput: isFinish
    })
  }

  async setUserInfo(type, value) {
    await this.setState({
      [type]: value
    })
    const isNotValid = checkRegisterInput[type](value)
    const isMatch = checkRegisterInput.passwordMatch(
      this.state.password1,
      this.state.password2
    )
    if(type.startsWith('password')) {
      type = 'password'
    }
    if (isNotValid) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          [type]: isNotValid.msg
        }
      })
    } else if(!isMatch) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          password: 'Password doesn\'t match',
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          [type]: null
        }
      })
    }
    this.checkFinish()
  }

  checkValidation(type, value) {
  }

  signup() {
    console.log('Sign Up')
  }

  render() {
    const identities = [
      { value: 0, label: 'I\'m an Employer' },
      { value: 1, label: 'I\'m an Employee' }
    ]
    let notice = null
    for(let error in this.state.errorMsg) {
      if(this.state.errorMsg[error]) {
        notice = this.state.errorMsg[error]
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
            <InputItem
              clear
              placeholder='Username'
              onChange={v => this.setUserInfo('username', v)}
              onBlur={v => this.checkValidation('username', v)}
              error={this.state.errorMsg.username}
            >
              Username:
            </InputItem>
            <InputItem
              clear
              placeholder='Email'
              onChange={v => this.setUserInfo('email', v)}
              onBlur={v => this.checkValidation('email', v)}
              type='email'
              error={this.state.errorMsg.email}
            >
              Email:
            </InputItem>
            {identities.map(i => (
              <RadioItem
                key={i.value}
                checked={this.state.identity === i.value}
                onChange={() => this.setUserInfo('identity', i.value)}
              >
                {i.label}
              </RadioItem>
            ))}
            <InputItem
              clear
              placeholder='Password'
              onChange={v => this.setUserInfo('password1', v)}
              onBlur={v => this.checkValidation('password1', v)}
              type="password"
              error={this.state.errorMsg.password}
            >
              Password:
            </InputItem>
            <InputItem
              clear
              placeholder='Repeat Password'
              onChange={v => this.setUserInfo('password2', v)}
              onBlur={v => this.checkValidation('password2', v)}
              type="password"
              error={this.state.errorMsg.password}
            >
              Password:
            </InputItem>
          </List>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={() => this.signup()}
            disabled={!this.state.isFinishInput}
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
