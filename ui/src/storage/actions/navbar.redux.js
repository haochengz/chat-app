
import { SETUP_NAVBAR } from '../types.redux'

export const setupNavbar = data => dispath => {
  dispath({
    type: SETUP_NAVBAR,
    payload: data
  })
}
