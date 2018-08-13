
import React from 'react'
import {
  WingBlank,
  WhiteSpace,
  InputItem,
  Toast,
  Button,
  NoticeBar,
  Icon,
  Radio,
  List
} from 'antd-mobile'
import axios from 'axios'
import Isemail from 'isemail'

import Logo from '../logo'
const RadioItem = Radio.RadioItem

export default class SignupView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitBtnName: 'SIGN UP',
      locked: false,
      globalError: {
        hasError: false,
        error: ''
      },
      username: {
        v: '',
        errors: []
      },
      email: {
        v: '',
        errors: []
      },
      password: {
        v: '',
        errors: []
      },
      password_: {
        v: '',
        errors: []
      },
      identity: {
        v: 0,
        errors: []
      }
    }
  }

  usernameError(v) {
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

  emailError(v) {
    let errors = []
    if(v.length === 0) {
      errors.push('Please enter a username')
    }
    if(!Isemail.validate(v)) {
      errors.push('Please enter an valid email address')
    }
    return errors
  }

  passwordError(v) {
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

  password_Error(v) {
    let errors = []
    if(v !== this.state.password.v) {
      errors.push('Password did\'t match')
    }
    return errors
  }

  identityError(v) {
    return []
  }

  passwordMatch(p1, p2) {
    let errors = []
    if(p1 !== p2) {
      errors.push('Password did\'t match')
    }
    return errors
  }

  input(type, v) {
    if(type === 'password') {
      const p1 = v
      const p2 = this.state.password_.v
      this.setState({
        [type]: {
          v: p1,
          errors: this[type+'Error'](p1)
        },
        password_: {
          v: p2,
          errors: this.passwordMatch(p1, p2)
        }
      })
    } else if(type === 'password_') {
      const p2 = v
      this.setState({
        [type]: {
          v: p2,
          errors: this[type+'Error'](p2)
        }
      })
    } else {
      this.setState({
        [type]: {
          v: v,
          errors: this[type+'Error'](v)
        }
      })
    }
  }

  showErrors(type) {
    if(this.state[type].errors.length > 0) {
      Toast.info(this.state[type].errors[0])
    }
  }

  checkOnServer(url, value) {
    return new Promise((resolve, reject) => {
      axios.get(url + value)
      .then(res => {
        if(res.data.code === 0){
          reject('taken')
        } else {
          resolve('ok')
        }
      }).catch(error => {
        this.setState({
          globalError: {
            hasError: true,
            error: 'Network error occurs'
          }
        })
      })
    })
  }

  setTakenError(type) {
    this.setState({
      globalError: {
        hasError: true,
        error: `This ${type} already been taken`
      },
      [type]: {
        v: this.state[type].v,
        errors: [`This ${type} already been taken`]
      }
    })
  }

  async submit() {
    if(this.state.submitBtnName === 'SIGN UP') {
      try {
        await this.checkOnServer('/api/user/query/username/', this.state.username.v)
      } catch(error) {
        this.setTakenError('username')
      }
      try {
        await this.checkOnServer('/api/user/query/email/', this.state.email.v)
      } catch(error) {
        this.setTakenError('email')
      }
      this.setState({
        submitBtnName: 'CONTINUE',
        locked: true
      })
    } else {
      const username = this.state.username.v
      const email = this.state.email.v
      const password = this.state.password.v
      const identity = this.state.identity.v
      axios.put('/api/user', {
        username,
        email,
        password,
        identity
      }).then(res => {
        if(res.data.code === 0) {
          this.props.history.push('/login')
        } else {
          this.setState({
            globalError: {
              hasError: true,
              error: 'Unknown error, please retry'
            },
            submitBtnName: 'SIGN UP',
            locked: false
          })
        }
      }).catch(error => {
        this.setState({
          globalError: {
            hasError: true,
            error: 'Network error occurs'
          }
        })
      })
    }
  }

  done() {
    const usernameOK = this.state.username.errors.length === 0 && this.state.username.v.length > 0
    const passwordOK = this.state.password.errors.length === 0 && this.state.password.v.length > 0
    const password_OK = this.state.password_.errors.length === 0 && this.state.password_.v.length > 0
    const emailOK = this.state.email.errors.length === 0 && this.state.email.v.length > 0
    if(usernameOK && passwordOK && password_OK && emailOK) {
      return true
    }
    return false
  }

  render() {
    const identities = [
      { value: 0, label: 'I\'m an Employer' },
      { value: 1, label: 'I\'m an Employee' }
    ]
    const noticeBar = this.state.globalError.hasError ?
        (<NoticeBar
          mode="closable"
          icon={<Icon type="check-circle-o" size="xxs" />}
        >
          {this.state.globalError.error}
        </NoticeBar>) :
        null

    return (
      <WingBlank>
        {noticeBar}
        <Logo />
        <h2>Sign up page</h2>
        <List
          renderHeader={() => 'Profile'}
        >
          <InputItem
            clear
            placeholder='Username'
            onChange={this.input.bind(this, 'username')}
            error={this.state.username.errors.length}
            onErrorClick={this.showErrors.bind(this, 'username')}
            value={this.state.username.v}
            disabled={this.state.locked}
          >
            Username:
          </InputItem>
          <InputItem
            clear
            placeholder='Email'
            onChange={this.input.bind(this, 'email')}
            error={this.state.email.errors.length}
            onErrorClick={this.showErrors.bind(this, 'email')}
            value={this.state.email.v}
            disabled={this.state.locked}
          >
            Email:
          </InputItem>
          <InputItem
            clear
            type="password"
            placeholder="Please enter the password"
            onChange={this.input.bind(this, 'password')}
            error={this.state.password.errors.length}
            onErrorClick={this.showErrors.bind(this, 'password')}
            value={this.state.password.v}
            disabled={this.state.locked}
          >
            Password:
          </InputItem>
          <InputItem
            clear
            type="password"
            placeholder="Repeat the password"
            onChange={this.input.bind(this, 'password_')}
            error={this.state.password_.errors.length}
            onErrorClick={this.showErrors.bind(this, 'password_')}
            value={this.state.password_.v}
            disabled={this.state.locked}
          >
            Password:
          </InputItem>
          {identities.map(i => (
            <RadioItem
              key={i.value}
              checked={this.state.identity.v === i.value}
              onChange={this.input.bind(this, 'identity', i.value)}
              disabled={this.state.locked}
            >
              {i.label}
            </RadioItem>
          ))}
        </List>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={this.submit.bind(this)}
          disabled={!this.done()}
        >
          {this.state.submitBtnName}
        </Button>
        <WhiteSpace />
        <Button
          onClick={() => this.props.history.push('/login')}
          disabled={this.state.locked}
        >
          Already had an account, sign up now
        </Button>
      </WingBlank>
    )
  }
}