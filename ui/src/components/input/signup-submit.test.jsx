
import React from 'react'
import { shallow } from 'enzyme'

import SignupSubmit from './signup-submit'

/*
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
*/

describe('<SignupSubmit stage={\'SIGN UP\'}/>', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SignupSubmit stage={'SIGN UP'}/>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should calling props.query with ok if given username and email is valid for registration', () => {
    const util = require('../../util/user-util')
    util.queryExistenceOnServer = jest.fn(() => Promise.resolve('ok'))
    const whenQuery = (status, payload) => {
      expect(status).toBe('ok')
    }
    const wrapper = shallow(
      <SignupSubmit
        stage={'SIGN UP'}
        query={whenQuery}
        registrant={{
          username: 'testuser',
          email: 'testuser@gmail.com'
        }}
      />
    )
    wrapper.simulate('click')
    expect(util.queryExistenceOnServer).toBeCalled()
  })

  it('should calling props.query with error if given username or email is invalid for registration', () => {
    const util = require('../../util/user-util')
    util.queryExistenceOnServer = jest.fn(() => Promise.reject('username'))
    const whenQuery = (status, payload) => {
      expect(status).toBe('taken', {
        btn: 'SIGN UP',
        hasError: true,
        error: 'Username already been taken',
        originError: 'username'
      })
    }
    const wrapper = shallow(
      <SignupSubmit
        stage={'SIGN UP'}
        query={whenQuery}
        registrant={{
          username: 'testuser',
          email: 'testuser@gmail.com'
        }}
      />
    )
    wrapper.simulate('click')
    expect(util.queryExistenceOnServer).toBeCalled()
  })
})

describe('<SignupSubmit stage={\'CONTINUE\'}/>', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SignupSubmit stage={'CONTINUE'}/>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should calling props.submit with ok if registration were finish', () => {
    const util = require('../../util/user-util')
    util.signUpAs = jest.fn(() => Promise.resolve())
    const whenSubmit = (status, payload) => {
      expect(status).toBe('ok')
    }
    const wrapper = shallow(
      <SignupSubmit
        stage={'SUBMIT'}
        submit={whenSubmit}
        registrant={{
          username: 'testuser',
          email: 'testuser@gmail.com'
        }}
      />
    )
    wrapper.simulate('click')
    expect(util.signUpAs).toBeCalled()
  })

  it('should calling props.submit with error if registration failed', () => {
    const util = require('../../util/user-util')
    util.signUpAs = jest.fn(() => Promise.reject())
    const whenSubmit = (status, payload) => {
      expect(status).toBe('error')
    }
    const wrapper = shallow(
      <SignupSubmit
        stage={'SUBMIT'}
        submit={whenSubmit}
        registrant={{
          username: 'testuser',
          email: 'testuser@gmail.com'
        }}
      />
    )
    wrapper.simulate('click')
    expect(util.signUpAs).toBeCalled()
  })
})