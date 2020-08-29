import React from 'react'
import { Story, Meta } from '@storybook/react'

import Iframe from './Iframe'
import IframeWrapper, { IframeWrapperProps } from './IframeWrapper'

export default {
  title: 'Chungking Core/Iframe/IframeWrapper',
  component: Iframe
} as Meta<IframeWrapperProps>

export const Example: Story<IframeWrapperProps> = args => {
  return (
    <IframeWrapper {...args}>
      <Iframe
        src="https://www.youtube-nocookie.com/embed/P_mQpbCSQOo"
        frameBorder={0}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </IframeWrapper>
  )
}
Example.args = {
  width: '100%',
  maxWidth: 500
}
