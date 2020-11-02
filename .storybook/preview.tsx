// .storybook/preview.js
import * as React from 'react'
import { Global } from '@emotion/core'
import { Theme } from '../components/chungking-core/Theme'
import GlobalStyles from '../components/chungking-core/utils/globalStyles'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

// .storybook/preview.js

export const decorators = [
  (Story) => (
    <Theme>
      <Global styles={GlobalStyles} />
      <Story />
    </Theme>
  )
]
