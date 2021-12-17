import * as React from 'react';
import { StackProps } from '@resir014/chungking-react';
import PhotoListItem from './PhotoListItem';
import { BasePhotoProps } from '~/types/posts';

interface FeaturedPhotoProps extends StackProps {
  photo: BasePhotoProps;
}

const FeaturedPhoto: React.FC<FeaturedPhotoProps> = ({ photo, ...rest }) => {
  return <PhotoListItem photo={photo} {...rest} />;
};

export default FeaturedPhoto;
