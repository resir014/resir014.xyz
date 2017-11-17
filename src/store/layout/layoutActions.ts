import { ActionCreator } from 'redux'
import { ToggleSidebarAction } from './types'

export const toggleSidebar: ActionCreator<ToggleSidebarAction> = () => ({
  type: '@@gatsby/TOGGLE_SIDEBAR'
})
