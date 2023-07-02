import clsx from 'clsx';
import Image, { ImageProps } from 'next/legacy/image';
import * as React from 'react';

export type AvatarSizes = 64 | 96;

export interface AvatarProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: AvatarSizes;
  alt?: ImageProps['alt'];
  src: ImageProps['src'];
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, className, size, ...rest }, ref) => {
    const avatarSizes = React.useMemo(() => {
      switch (size) {
        case 96: {
          return 'w-24 h-24';
        }
        case 64: {
          return 'w-16 h-16';
        }
        default: {
          return 'w-16 h-16';
        }
      }
    }, [size]);

    return (
      <div
        className={clsx(
          'relative rounded-full border-2 border-chungking-white overflow-hidden',
          avatarSizes,
          className
        )}
        ref={ref}
        {...rest}
      >
        <Image src={src} layout="fill" />
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
