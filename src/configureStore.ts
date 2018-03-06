import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { ApplicationState, reducers } from './store'

export default function configureStore(initialState?: ApplicationState) {
  const allReducers = buildRootReducer<ApplicationState>(reducers)
  return createStore<ApplicationState>(
    allReducers,
    initialState,
    devToolsEnhancer({})
  )
}

function buildRootReducer<TState>(allReducers: any) {
  // Gatsby doesn't like the object spread operator
  return combineReducers<TState>(Object.assign({}, allReducers))
}
