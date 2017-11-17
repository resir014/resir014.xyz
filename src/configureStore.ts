import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { ApplicationState, reducers } from './store'

export default function configureStore() {
  const allReducers = combineReducers<ApplicationState>({
    ...reducers
  })
  return createStore<ApplicationState>(allReducers, devToolsEnhancer({}))
}
