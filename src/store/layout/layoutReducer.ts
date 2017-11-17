import { Reducer, Action } from 'redux'
import { LayoutState, KnownAction } from './types'

export const initialState: LayoutState = {
  sidebarVisible: false
}

// Remember, Gatsby doesn't like object spread, so Object.assign() is the only
// way to go here.
export const reducer: Reducer<LayoutState> =
  (state: LayoutState = initialState, action: KnownAction) => {
    switch (action.type) {
      case '@@gatsby/TOGGLE_SIDEBAR':
        return Object.assign({}, state, { sidebarVisible: !state.sidebarVisible })
      default:
        return state
    }
  }
