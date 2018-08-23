import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import SignupView from './components/auth/signup'
import SigninView from './components/auth/signin'
import UserStatus from './components/auth/user-status'
import Profile from './components/auth/profile'
import Navgation from './components/nav-bar'
import Dashboard from './components/layout/dashboard'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <UserStatus>
          <Navgation />
            <Switch>
              {/* TODO: Asynchronous loading components */}
              <Route path='/' exact component={Dashboard}></Route>
              <Route path='/login' component={SigninView}></Route>
              <Route path='/register' component={SignupView}></Route>
              <Route path='/profile' component={Profile}></Route>
            </Switch>
          </UserStatus>
        </div>
      </BrowserRouter>
    )
  }
}
