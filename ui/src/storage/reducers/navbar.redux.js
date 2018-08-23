
import { SETUP_NAVBAR } from '../types.redux'

const initState = {
  visible: false,
  leftIconVisible: false,
  leftIcon: null,
  leftIconOnClick: null,
  title: ''
}

export default function navbar(state=initState, action) {
  switch(action.type) {
    case SETUP_NAVBAR:
      return action.payload
    default:
      return state
  }
}
