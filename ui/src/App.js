import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Front from './views/front'
import SignupView from './components/auth/signup'
import SigninView from './components/auth/signin'
import UserStatus from './components/auth/user-status'
import Profile from './components/auth/profile'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <UserStatus>
            <Switch>
              {/* TODO: Asynchronous loading components */}
              <Route path='/' exact component={Front}></Route>
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
