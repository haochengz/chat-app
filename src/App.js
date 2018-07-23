import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Front from './views/front'
import Login from './views/auth/login'
import Register from './views/auth/register'
import UserStatus from './components/user-status'

function Foo() {
  return <h2>Dashboard</h2>
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <UserStatus />
          <Switch>
            <Route path='/' exact component={Front}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/dashboard' component={Foo}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
