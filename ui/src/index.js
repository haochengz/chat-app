import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

import './config'
import App from './App'
import store from './storage'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
