import * as React from 'react'
import { BoxProps } from '~/components/chungking-core'
import { Figure } from '../markdown'

interface PhotoWrapperProps extends BoxProps {
  image: string
}

const PhotoWrapper: React.FC<PhotoWrapperProps> = ({ image, ...rest }) => {
  return (
    <Figure my={0} {...rest}>
      <img src={image} alt={image} />
    </Figure>
  )
}

export default PhotoWrapper
