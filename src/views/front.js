
import React, { Component } from 'react'
import axios from 'axios'

export default class Front extends Component {
  componentDidMount() {
    axios.get('http://www.baidu.com')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <h2>Front Page</h2>
    )
  }
}
