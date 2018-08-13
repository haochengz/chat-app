
import { 
  createStore,
  applyMiddleware, 
  compose,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'

const REDUCERS = [
  'user'
]
let reducers = {}

REDUCERS.forEach(reducer => {
  reducers[reducer] = require('./reducers/' + reducer + '.redux.js').default
})

const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default store
