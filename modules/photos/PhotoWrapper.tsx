import * as React from 'react'
import { Box, BoxProps } from '@resir014/chungking-core'
import { Figure } from '../markdown'

interface PhotoWrapperProps extends BoxProps {
  image: string
}

const PhotoWrapper: React.FC<PhotoWrapperProps> = ({ image, ...rest }) => {
  return (
    <Figure my={0} {...rest}>
      <Box as="img" className="u-photo" loading="lazy" src={image} alt="Photo Post" />
    </Figure>
  )
}

export default PhotoWrapper
