import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Button
} from 'antd-mobile'

import {
  signin,
  signout
} from '../../storage/actions/user.redux'

const R = require('ramda')

const publicViewList = [
  '/login',
  '/register'
]

@withRouter
@connect(
  state => ({ user: state.user }),
  { signin, signout }
)
export default class UserStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notice: null,
      greenLight: false
    }
  }

  async componentWillMount() {
    if(this.props.user.hasLogin === false)
      this.props.signin()
  }

  componentDidMount() {
    const isPublicRequest = R.any(
      // FIXME: startsWith is a better way
      R.equals(this.props.location.pathname)
    )(publicViewList)
    if (isPublicRequest) {
      this.setState({
        notice: null,
        greenLight: true
      })
    } else {
      this.setState({
        notice: 'Please Login First',
        greenLight: false
      })
    }
  }

  render() {
    if(this.props.user.hasLogin || this.state.greenLight) {
      var app = this.props.children
    }
    return (
      <div>
        {app}
      </div>
    )
  }
}
