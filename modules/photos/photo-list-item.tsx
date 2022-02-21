import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import convert from 'htmr';
import { PostMeta } from '../posts';
import { PhotoWrapper } from './photo-wrapper';
import { BasePhotoProps } from '~/types/posts';
import htmrTransform from '~/lib/htmr-transform';

export interface PhotoListItemProps extends React.ComponentPropsWithoutRef<'article'> {
  photo: BasePhotoProps;
}

export const PhotoListItem: React.FC<PhotoListItemProps> = ({
  photo,
  className,
  style,
  ...rest
}) => {
  const { date, category, header_image, content, slug } = photo;

  return (
    <article className={clsx('h-entry relative space-y-4', className)} style={style} {...rest}>
      <PostMeta date={date} category={category} slug={slug} />
      {header_image && (
        <section>
          <Link href="/photos/[...slug]" as={`/photos/${slug}`}>
            <a>
              <PhotoWrapper image={header_image} />
            </a>
          </Link>
        </section>
      )}
      {content && (
        <div className="e-content mx-auto prose lg:prose-lg prose-base prose-invert prose-chungking">
          {convert(content, { transform: htmrTransform })}
        </div>
      )}
    </article>
  );
};
