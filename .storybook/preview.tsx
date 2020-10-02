// .storybook/preview.js
import * as React from 'react'
import { themes } from '@storybook/theming'
import { Global } from '@emotion/core'
import { Theme } from '../src/components/chungking-core/Theme'
import GlobalStyles from '../src/components/chungking-core/utils/globalStyles'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

// .storybook/preview.js

export const decorators = [
  Story => (
    <Theme>
      <Global styles={GlobalStyles} />
      <Story />
    </Theme>
  )
]
