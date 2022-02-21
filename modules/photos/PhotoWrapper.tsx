import clsx from 'clsx';
import * as React from 'react';

interface PhotoWrapperProps extends React.ComponentPropsWithoutRef<'figure'> {
  image: string;
  alt?: string;
}

const PhotoWrapper: React.FC<PhotoWrapperProps> = ({ className, image, alt, ...rest }) => {
  return (
    <figure className={clsx('lg:-mx-12', className)} {...rest}>
      <img
        className="u-photo mx-auto rounded-md shadow-single align-middle bg-chungking-grey-800"
        loading="lazy"
        src={image}
        alt={alt ?? ''}
      />
    </figure>
  );
};

export default PhotoWrapper;
