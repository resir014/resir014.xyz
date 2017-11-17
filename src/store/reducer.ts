import { Reducer, Action } from 'redux'
import { ApplicationState, KnownAction } from './types'

export const initialState: ApplicationState = {
  sidebarVisible: false
}

// Remember, Gatsby doesn't like object spread, so Object.assign() is the only
// way to go here.
export const reducer: Reducer<ApplicationState> =
  (state: ApplicationState = initialState, action: KnownAction) => {
    switch (action.type) {
      case '@@gatsby/TOGGLE_SIDEBAR':
        return Object.assign({}, state, { sidebarVisible: !state.sidebarVisible })
      default:
        return state
    }
  }
