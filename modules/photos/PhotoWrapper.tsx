import * as React from 'react'
import { Box, BoxProps } from '@resir014/chungking-react'
import { Figure } from '../markdown'

interface PhotoWrapperProps extends BoxProps {
  image: string
}

const Img = Box.withComponent('img')

const PhotoWrapper: React.FC<PhotoWrapperProps> = ({ image, ...rest }) => {
  return (
    <Figure my={0} {...rest}>
      <Img className="u-photo" loading="lazy" src={image} alt="Photo Post" />
    </Figure>
  )
}

export default PhotoWrapper
