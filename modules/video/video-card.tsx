import * as React from 'react';

import clsx from 'clsx';

interface VideoCardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  metadata?: React.ReactNode;
  embed: React.ReactNode;
  title?: React.ReactNode;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  className,
  style,
  metadata,
  embed,
  title,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx('bg-chungking-grey-800 rounded-md shadow-single overflow-hidden', className)}
      style={style}
      {...rest}
    >
      {embed}
      {title || children ? (
        <div className="relative space-y-3 p-6">
          {metadata}
          {title && <h1 className="text-2xl font-semibold p-name">{title}</h1>}
          {children}
        </div>
      ) : null}
    </div>
  );
};
