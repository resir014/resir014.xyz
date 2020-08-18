import * as React from 'react'
import { Global } from '@emotion/core'
import { Theme } from '../components/chungking-core/Theme'
import GlobalStyles from '../components/chungking-core/utils/globalStyles'
import PrismTheme from '../styles/PrismTheme'

import 'modern-normalize'
import 'typeface-inter'
import '../fonts/jetbrains-mono.css'

const StoryDecorator: React.FC = ({ children }) => {
  return (
    <Theme>
      <Global styles={GlobalStyles} />
      <Global styles={PrismTheme} />
      {children}
    </Theme>
  )
}

export default StoryDecorator
