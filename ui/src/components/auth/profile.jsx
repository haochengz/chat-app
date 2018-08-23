
import React from 'react'
import { connect } from 'react-redux'
import {
  List,
  Button,
  TextareaItem
} from 'antd-mobile'

import AvatarSelector from '../input/avatar'
import { update } from '../../storage/actions/user.redux'

@connect(
  status => ({user: status.user}),
  {update}
)
export default class Profile extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      role: '',
      positions: [],
      cv: '',
      avatar: ''
    }
  }

  componentWillMount() {
    if(this.props.user.hasLogin) {
      const role = this.props.identify === 1 ? 'employee' : 'employer'
      const positions = this.props.user.positions
        ? this.props.user.positions
        : ''
      const cv = this.props.user.cv
        ? this.props.user.cv
        : ''
      const avatar = this.props.user.avatar
        ? this.props.user.avatar
        : ''
      this.setState({
        role: role,
        positions: positions,
        cv: cv,
        avatar: avatar
      })
    } else {
      // error
    }
  }

  input(type, value) {
    this.setState({
      [type]: value
    })
  }

  employeeFields() {
    return (
      <TextareaItem
        title="CV"
        rows={5}
        value={this.state.cv}
        onChange={this.input.bind(this, 'cv')}
      />
    )
  }

  employerFields() {
    return (
      <div>
        Job Openning:
        <TextareaItem
          rows={5}
          value={this.state.positions}
          onChange={this.input.bind(this, 'positions')}
        />
      </div>
    )
  }

  submit() {
    const userProfile = {
      ...this.props.user,
      positions: this.state.positions,
      cv: this.state.cv,
      avatar: this.state.avatar
    }
    this.props.update(userProfile)
  }

  render() {
    let inputItems = null
    if(this.state.role === 'employee') {
      inputItems = this.employeeFields()
    } else {
      inputItems = this.employerFields()
    }
    return (
      <List renderHeader = {() => 'Profile'}>
        <AvatarSelector
          input={this.input.bind(this, 'avatar')}
          currentAvatar={this.state.avatar}
        />
        {inputItems}
        <Button
          type="primary"
          onClick={this.submit.bind(this)}
        >
          Save
        </Button>
      </List>
    )
  }
}