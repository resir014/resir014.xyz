import React from 'react'
import { Story, Meta } from '@storybook/react'

import Iframe, { IframeProps } from './Iframe'
import IframeWrapper from './IframeWrapper'

export default {
  title: 'Chungking Core/Iframe/Iframe',
  component: Iframe
} as Meta<IframeProps>

export const Example: Story<IframeProps> = args => {
  return (
    <IframeWrapper width="100%" maxWidth={500}>
      <Iframe {...args} />
    </IframeWrapper>
  )
}
Example.args = {
  src: 'https://www.youtube-nocookie.com/embed/P_mQpbCSQOo',
  frameBorder: 0,
  allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
  allowFullScreen: true
}
