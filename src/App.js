import React, { Component } from 'react';
import { connect } from 'react-redux'

import './App.css';
import { Add, Rem } from './index.redux'

@connect(
  state => ({num: state}),
  { Add, Rem }
)
class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Now we have {this.props.num} machine guns</h2>
        <button onClick={this.props.Add}>ADD</button>
        <button onClick={this.props.Rem}>REMOVE</button>
      </div>
    );
  }
}

export default App;
