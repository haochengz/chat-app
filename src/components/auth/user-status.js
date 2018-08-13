import React from 'react'
import axios from 'axios'
import { NoticeBar, Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
const R = require('ramda')

const publicViewList = [
  '/login',
  '/register'
]

@withRouter
export default class UserStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notice: null,
      greenLight: false
    }
  }
  componentDidMount() {
    const isPublicRequest = R.any(
      R.equals(this.props.location.pathname)
    )(publicViewList)
    if (isPublicRequest) {
      this.setState({
        notice: null,
        greenLight: true
      })
    } else {
      // TODO: not working yet, suppose to calling a backend auth interface
      // with cookies which contains user information and login with that 
      // information. Waiting for backend implementation
      axios.get('/api/user')
        .then(res => {
          if (res.data.code === 0) {
            return null
          } else {
            this.setState({
              notice: 'Please Login First',
              greenLight: false
            })
            this.props.history.push('/login')
          }
        })
        .catch(err => {
          console.log(err)
          this.setState({
            notice: 'Network error',
            greenLight: false
          })
        })
    }
  }

  render() {
    const msg = (
      <NoticeBar
        mode="closable"
        icon={<Icon type="check-circle-o" size="xxs" />}
      >{this.state.notice}</NoticeBar>
    )
    const notice = this.state.notice
      ? msg
      : null
    return notice
  }
}
