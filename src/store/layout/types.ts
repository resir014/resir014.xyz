import { Action } from 'redux'

export interface LayoutState {
  sidebarVisible: boolean
  randomSplashIndex: number
}

export interface ToggleSidebarAction extends Action {
  type: '@@layout/TOGGLE_SIDEBAR'
}

export interface RandomiseSplashAction extends Action {
  payload: number
  type: '@@layout/RANDOMISE_SPLASH'
}

export type KnownAction = ToggleSidebarAction | RandomiseSplashAction
