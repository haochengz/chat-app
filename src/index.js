import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  machineGunAction,
  Add,
  Rem
} from './index.redux'

const reduxDev = window.devToolsExtension() || (f => f)

const store = createStore(machineGunAction, compose(
  applyMiddleware(thunk),
  reduxDev
))
store.subscribe(renderDOM)

const machineGun = {
  store: store,
  addGun: Add,
  remGun: Rem
}

function renderDOM() {
  ReactDOM.render(<App machineGun={machineGun}/>, document.getElementById('root'));
  registerServiceWorker();
}

renderDOM()
