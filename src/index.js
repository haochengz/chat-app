import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  machineGunAction
} from './index.redux'

const reduxDev = window.devToolsExtension() || (f => f)
const store = createStore(machineGunAction, compose(
  applyMiddleware(thunk),
  reduxDev
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
