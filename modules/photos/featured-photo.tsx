import * as React from 'react';
import { BasePhotoProps } from '~/types/posts';
import { PhotoListItem } from './photo-list-item';

export interface FeaturedPhotoProps {
  photo: BasePhotoProps;
}

export const FeaturedPhoto: React.FC<FeaturedPhotoProps> = ({ photo }) => {
  return <PhotoListItem photo={photo} />;
};
