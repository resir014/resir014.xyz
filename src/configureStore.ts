import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { ApplicationState, initialState, reducer } from './store'

export default createStore<ApplicationState>(reducer, initialState, devToolsEnhancer({}))
