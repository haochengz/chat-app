import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Front from './views/front'
import Login from './views/auth/login'
import Register from './views/auth/register'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Front}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
