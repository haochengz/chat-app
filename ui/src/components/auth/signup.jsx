
import React from 'react'
import {
  WingBlank,
  WhiteSpace,
  Button,
  NoticeBar,
  Icon,
  Radio,
  List
} from 'antd-mobile'
import { connect } from 'react-redux'

import Logo from '../logo'
import UsernameInput from '../input/username'
import EmailInput from '../input/email'
import PasswordComfirmInput from '../input/password-comfirm'
import SignupSubmit from '../input/signup-submit'

import { login } from '../../storage/actions/user.redux'

const RadioItem = Radio.RadioItem

@connect(
  state => ({user: state.user}),
  { login }
)
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
      identity: {
        v: 0,
        errors: []
      }
    }
  }

  input(type, v, errors) {
    this.setState({
      [type]: {
        v: v,
        errors: errors
      }
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

  async whenSubmit(status, payload) {
    console.log('submit')
    console.log(status)
    if(status === 'ok') {
      console.log('register ok')
      await this.props.login(
        this.state.username.v,
        this.state.password.v
      )
      console.log('goto profile page')
      // FIXME: /profile view throws an error because that
      // redux action isn't finish
      // and this is a bad way to deal with it, fix in the future
      setTimeout(
        () => this.props.history.push('/profile'),
        2000
      )
    } else {
      this.setState({
        submitBtnName: payload.btn,
        globalError: {
          hasError: payload.hasError,
          error: payload.error
        }
      })
    }
  }

  whenQuery(status, payload) {
    if(status === 'ok') {
      this.setState({
        submitBtnName: 'CONTINUE',
        globalError: {
          hasError: false,
          error: ''
        }
      })
    } else {
      this.setState({
        submitBtnName: payload.btn,
        globalError: {
          hasError: payload.hasError,
          error: payload.error
        }
      })
    }
  }

  done() {
    const usernameOK = this.state.username.errors.length === 0 && this.state.username.v.length > 0
    const passwordOK = this.state.password.errors.length === 0 && this.state.password.v.length > 0
    const emailOK = this.state.email.errors.length === 0 && this.state.email.v.length > 0
    if(usernameOK && passwordOK && emailOK) {
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
          <UsernameInput
            onChange={this.input.bind(this, 'username')}
            errors={this.state.username.errors}
            value={this.state.username.v}
            locked={this.state.locked}
          />
          <EmailInput
            onChange={this.input.bind(this, 'email')}
            errors={this.state.email.errors}
            value={this.state.email.v}
            locked={this.state.locked}
          />
          <PasswordComfirmInput
            onChange={this.input.bind(this, 'password')}
            errors={this.state.password.errors}
            value={this.state.password.v}
            locked={this.state.locked}
          />
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
        <SignupSubmit
          stage={this.state.submitBtnName}
          submit={this.whenSubmit.bind(this)}
          query={this.whenQuery.bind(this)}
          done={!this.done()}
          registrant={{
            username: this.state.username.v,
            email: this.state.email.v,
            password: this.state.password.v,
            identity: this.state.identity.v
          }}
        />
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