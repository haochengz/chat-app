
import React from 'react'
import { connect } from 'react-redux'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'

import SignupView from './signup'

describe('<SignupView />', () => {
  it('should match the snapshot', () => {
    const initState = {
      user: {
        username: 'testuser'
      }
    }
    const mapStateToProps = state => ({
      user: state.user
    })
    const ConnectedComponent = connect(mapStateToProps)(SignupView)
    const wrapper = shallowWithStore(<ConnectedComponent />, createMockStore(initState))
    expect(wrapper).toMatchSnapshot()
  })
})