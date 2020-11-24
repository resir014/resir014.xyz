import Image from 'next/image'
import * as React from 'react'
import { BoxProps } from '@resir014/chungking-core'
import { Figure } from '../markdown'

interface PhotoWrapperProps extends BoxProps {
  image: string
}

const PhotoWrapper: React.FC<PhotoWrapperProps> = ({ image, ...rest }) => {
  return (
    <Figure my={0} overflow="hidden" {...rest}>
      <Image className="u-photo" loading="lazy" src={image} alt="Photo Post" unsized unoptimized />
    </Figure>
  )
}

export default PhotoWrapper
