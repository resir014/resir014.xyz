import * as React from 'react'
import styled from '@emotion/styled'

import { colors } from '../../styles/variables'
import VideoTitle from './VideoTitle'

interface VideoCardProps {
  embed: React.ReactNode
  title?: string
}

const Inner = styled('div')`
  padding: 1.5rem;
  padding-top: 1rem;
`

const Root = styled('section')`
  margin-bottom: 3rem;
  background-color: ${colors.grey90};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const VideoCard: React.FC<VideoCardProps> = ({ embed, title, children }) => (
  <Root>
    {embed}

    {title && <VideoTitle className="p-name">{title}</VideoTitle>}
    <Inner>{children}</Inner>
  </Root>
)

export default VideoCard
