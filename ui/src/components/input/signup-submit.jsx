
import React from 'react'
import {
  Button
} from 'antd-mobile'

import {
  queryExistenceOnServer,
  signUpAs
} from '../../util/user-util'

export default class SignupSubmit extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  async onClick() {
    if(this.props.stage === 'SIGN UP') {
      try {
        await queryExistenceOnServer('username', this.props.registrant.username)
        await queryExistenceOnServer('email', this.props.registrant.email)
        this.props.query('ok')
      } catch(error) {
        let errorMsg
        if (error === 'username') errorMsg = 'Username already been taken'
        else if (error === 'email') errorMsg = 'Email already been taken'
        else errorMsg = 'A network error occurs'

        this.props.query('taken', {
          btn: 'SIGN UP',
          hasError: true,
          error: errorMsg,
          originError: error
        })
      }
    } else {
      try {
        var registerStatus = await signUpAs(this.props.registrant)
        this.props.submit('ok', registerStatus)
      } catch(error) {
        this.props.submit('error', {
          btn: 'SIGN UP',
          globalError: {
            hasError: true,
            error: 'Unknown error occurs during the registration'
          }
        })
      }
    }
  }

  render() {
    return (
      <Button
        type="primary"
        onClick={this.onClick}
        disabled={this.props.done}
      >
        {this.props.stage}
      </Button>
    )
  }
}
