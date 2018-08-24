
import React from 'react'
import { connect } from 'react-redux'

import Footer from './footer'
import { setupNavbar } from '../../storage/actions/navbar.redux'
import List from './list'

@connect(
  state => state,
  {setupNavbar}
)
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'List'
    }
  }

  componentWillMount() {
    this.props.setupNavbar({
      visible: true,
      leftIconVisible: false,
      title: 'Dashboard'
    })
  }

  renderContent(v) {
    if(v === 'List') return <List />
  }

  focusChange(v) {
    this.setState({
      selected: v
    })
  }

  render() {
    return (
      <Footer
        renderContent={this.renderContent.bind(this)}
        focusChange={this.focusChange.bind(this)}
        selected={this.state.selected}
      />
    )
  }
}
