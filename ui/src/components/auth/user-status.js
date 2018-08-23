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
    var app = null
    if(this.props.user.hasLogin || this.state.greenLight) {
      app = this.props.children
    } else {
      // TODO: wait for 5 seconds then display the login tip
      // or wait until login process is done
      app = <h2>Login please</h2>
    }
    return (
      <div>
        {app}
      </div>
    )
  }
}
