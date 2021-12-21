import * as React from 'react';
import classnames from 'clsx';

import { SiteAuthor } from '~/lib/data/site-metadata';
import { Avatar } from '~/components/ui';

export interface PostHCardProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  image?: string;
  author: SiteAuthor;
}

export const PostHCard: React.FC<PostHCardProps> = ({ className, image, author, ...rest }) => (
  <div
    className={classnames(
      'p-author h-card flex flex-col items-center text-center space-y-6 px-4 py-6 lg:py-8 bg-chungking-grey-800 shadow-lg rounded-md overflow-hidden',
      className
    )}
    {...rest}
  >
    <div className="flex relative text-center items-center">
      <Avatar className="u-photo" src={image ?? author.avatar} alt={author.name} />
    </div>
    <div className="relative space-y-1">
      <p className="text-xl font-semibold">
        <a
          className="p-name u-url helper-link-cover"
          rel="author noopener noreferrer"
          target="_blank"
          href={author.website || '/'}
        >
          {author.name}
        </a>
      </p>
      <p className="p-note text-base">{author.description}</p>
    </div>
    <a className="u-email hidden" href={`mailto:${author.email}`}>
      {author.email}
    </a>
  </div>
);
