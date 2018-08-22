
import React from 'react'
import { connect } from 'react-redux'

import AvatarSelector from '../input/avatar'

@connect(
  status => ({user: status.user}),
  {}
)
export default class Profile extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      role: ''
    }
  }

  componentWillMount() {
    if(this.props.user.hasLogin) {
      if(this.props.identify === 1) {
        this.setState({
          role: 'employee'
        })
      } else {
        this.setState({
          role: 'employer'
        })
      }
    } else {
      // error
    }
  }

  input(type, value) {
    console.log(value)
    this.setState({
      [type]: value
    })
  }

  employeeFields() {
    //
  }

  employerFields() {
    //
  }

  render() {
    let inputItems = null
    if(this.state.role === 'employee') {
      inputItems = this.employeeFields()
    } else {
      inputItems = this.employerFields()
    }
    return (
      <AvatarSelector
        input={this.input.bind(this, 'avatar')}
        currentAvatar={this.state.avatar}
      />
    )
  }
}