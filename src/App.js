import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const store = this.props.machineGun.store
    const current = store.getState()
    const add = this.props.machineGun.addGun
    const rem = this.props.machineGun.remGun
    return (
      <div className="App">
        <h2>Now we have {current} machine guns</h2>
        <button onClick={() => store.dispatch(add())}>ADD</button>
        <button onClick={() => store.dispatch(rem())}>REMOVE</button>
      </div>
    );
  }
}

export default App;
