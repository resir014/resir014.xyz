import * as React from 'react';
import PhotoListItem from './PhotoListItem';
import { BasePhotoProps } from '~/types/posts';

interface FeaturedPhotoProps {
  photo: BasePhotoProps;
}

const FeaturedPhoto: React.FC<FeaturedPhotoProps> = ({ photo }) => {
  return <PhotoListItem photo={photo} />;
};

export default FeaturedPhoto;
