import React from 'react'
import { Story, Meta } from '@storybook/react'

import ResponsiveIframe from './ResponsiveIframe'
import ResponsiveWrapper, { ResponsiveWrapperProps } from './ResponsiveWrapper'

export default {
  title: 'Chungking Core/ResponsiveWrapper',
  component: ResponsiveWrapper
} as Meta<ResponsiveWrapperProps>

export const Example: Story<ResponsiveWrapperProps> = (args) => {
  return (
    <ResponsiveWrapper {...args}>
      <ResponsiveIframe
        src="https://www.youtube-nocookie.com/embed/P_mQpbCSQOo"
        frameBorder={0}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </ResponsiveWrapper>
  )
}

Example.args = {
  width: '100%',
  maxWidth: 500,
  ratio: 16 / 9
}
