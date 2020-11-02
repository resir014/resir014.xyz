import * as React from 'react'
import { StackProps } from '~/components/chungking-core'
import { BasePhotoProps } from '~/types/posts'
import PhotoListItem from './PhotoListItem'

interface FeaturedPhotoProps extends StackProps {
  photo: BasePhotoProps
}

const FeaturedPhoto: React.FC<FeaturedPhotoProps> = ({ photo, ...rest }) => {
  return <PhotoListItem photo={photo} {...rest} />
}

export default FeaturedPhoto
