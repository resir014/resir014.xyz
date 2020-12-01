// .storybook/preview.js
import * as React from 'react'
import { Global } from '@emotion/react'
import { Theme } from '../src/Theme'
import GlobalStyles from '../src/utils/globalStyles'

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
