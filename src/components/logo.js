
import React from 'react'

import '../assets/css/logo.css'
import logo from '../assets/logo.svg'

export default class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <img src={ logo } alt="logo" />
      </div>
    )
  }
}
