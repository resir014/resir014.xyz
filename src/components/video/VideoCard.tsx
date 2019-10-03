import * as React from 'react'
import styled from '@emotion/styled'

import { colors, layerShadows } from '../chungking-core'
import VideoTitle from './VideoTitle'

interface VideoCardProps {
  embed: React.ReactNode
  title?: string
}

const Inner = styled('div')`
  padding: 1.5rem;
`

const Root = styled('section')`
  margin-bottom: 3rem;
  background-color: ${colors.grey90};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: ${layerShadows.single};

  &:last-of-type {
    margin-bottom: 0;
  }
`

const VideoCard: React.FC<VideoCardProps> = ({ embed, title, children }) => (
  <Root>
    {embed}

    <Inner>
      {title && <VideoTitle>{title}</VideoTitle>}
      {children}
    </Inner>
  </Root>
)

export default VideoCard
