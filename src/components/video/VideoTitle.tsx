import * as React from 'react'
import { Heading } from '../chungking-core'

const VideoTitle: React.FC = ({ children }) => (
  <Heading as="h1" scale="trafalgar" mt={0} mb="sm" className="p-name">
    {children}
  </Heading>
)

export default VideoTitle
