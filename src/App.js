import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Front from './views/front'
import Login from './views/auth/login'
import SignupView from './components/auth/signup'
import UserStatus from './components/auth/user-status'

function Foo() {
  return <h1>Dashboard</h1>
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
            <Route path='/register' component={SignupView}></Route>
            <Route path='/dashboard' component={Foo}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
