
import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd-mobile'

import { fetchUsers } from '../../storage/actions/users.redex'

@connect(
  state => ({
    user: state.user,
    users: state.users
  }),
  { fetchUsers }
)
export default class List extends React.Component {

  componentWillMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div>
        {this.props.users
          .filter(item => item.identity !== this.props.user.identity)
          .map(item => {
            if(item.avatar) {
              item.avatar = require('../../assets/img/avatar/' + item.avatar + '.jpeg')
            }
            return item
          })
          .map(item => (
            <Card
              key={item._id}
            >
              <Card.Header
                thumb={item.avatar}
                extra={<span>{item.username}</span>}
              />
            </Card>
          ))
        }
      </div>
    )
  }
}
