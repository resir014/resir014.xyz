import { Reducer, Action } from 'redux'
import { LayoutState, KnownAction } from './types'

export const initialState: LayoutState = {
  sidebarVisible: false,
  randomSplashIndex: 0
}

// Remember, Gatsby doesn't like object spread, so Object.assign() is the only
// way to go here.
export const reducer: Reducer<LayoutState> = (
  state: LayoutState = initialState,
  action: KnownAction
) => {
  switch (action.type) {
    case '@@layout/TOGGLE_SIDEBAR':
      return Object.assign({}, state, { sidebarVisible: !state.sidebarVisible })
    case '@@layout/RANDOMISE_SPLASH':
      return Object.assign({}, state, { randomSplashIndex: action.payload })
    default:
      return state
  }
}
