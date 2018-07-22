import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Front from './views/front'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Front}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
