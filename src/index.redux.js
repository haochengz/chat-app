
const ADD = 'add'
const REM = 'remove'

export function machineGunAction(state = 0, action) {
  switch(action.type) {
    case ADD:
      if (state < 20) return state + 1
      break
    case REM:
      if (state > 0) return state - 1
      break
    default:
      break
  }
  return state
}

export function Add() {
  return dispath => {
    setTimeout(() => {
      dispath({type: ADD})
    }, 500)
  }
}

export function Rem() {
  return {type: REM}
}
