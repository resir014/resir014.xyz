import { ActionCreator } from 'redux'
import { ToggleSidebarAction, RandomiseSplashAction } from './types'
import flavors from '../../utils/flavorText'

export const toggleSidebar: ActionCreator<ToggleSidebarAction> = () => ({
  type: '@@layout/TOGGLE_SIDEBAR'
})

export const randomiseSplash: ActionCreator<RandomiseSplashAction> = () => ({
  payload: Math.floor(Math.random() * flavors.length),
  type: '@@layout/RANDOMISE_SPLASH'
})
