import * as React from 'react';
import { PhotoListItem } from './photo-list-item';
import { BasePhotoProps } from '~/types/posts';

export interface FeaturedPhotoProps {
  photo: BasePhotoProps;
}

export const FeaturedPhoto: React.FC<FeaturedPhotoProps> = ({ photo }) => {
  return <PhotoListItem photo={photo} />;
};
