import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { PostMetadata } from '~/types/posts';
import { formatPostDate } from '~/lib/date-formatter';
import { getColorSchemeBySeed } from '~/lib/color-generator';

export type FeaturedPostItemVariants =
  | 'grey'
  | 'red'
  | 'orange'
  | 'green'
  | 'turquoise'
  | 'blue'
  | 'ultramarine'
  | 'purple'
  | 'magenta';

export interface FeaturedPostListItemProps extends React.ComponentPropsWithoutRef<'article'> {
  post: PostMetadata;
  variant?: FeaturedPostItemVariants;
}

function generateVariantColor(variant: FeaturedPostItemVariants = 'blue') {
  switch (variant) {
    case 'grey': {
      return {
        bg: 'bg-chungking-grey-500',
        border: 'border-chungking-grey-500',
      };
    }
    case 'red': {
      return {
        bg: 'bg-chungking-red-500',
        border: 'border-chungking-red-500',
      };
    }
    case 'orange': {
      return {
        bg: 'bg-chungking-orange-500',
        border: 'border-chungking-orange-500',
      };
    }
    case 'green': {
      return {
        bg: 'bg-chungking-green-500',
        border: 'border-chungking-green-500',
      };
    }
    case 'turquoise': {
      return {
        bg: 'bg-chungking-turquoise-500',
        border: 'border-chungking-turquoise-500',
      };
    }
    case 'blue': {
      return {
        bg: 'bg-chungking-blue-500',
        border: 'border-chungking-blue-500',
      };
    }
    case 'ultramarine': {
      return {
        bg: 'bg-chungking-ultramarine-500',
        border: 'border-chungking-ultramarine-500',
      };
    }
    case 'purple': {
      return {
        bg: 'bg-chungking-purple-500',
        border: 'border-chungking-purple-500',
      };
    }
    case 'magenta': {
      return {
        bg: 'bg-chungking-magenta-500',
        border: 'border-chungking-magenta-500',
      };
    }
    default: {
      return {
        bg: 'bg-chungking-blue-500',
        border: 'border-chungking-blue-500',
      };
    }
  }
}

export const FeaturedPostListItem: React.FC<FeaturedPostListItemProps> = ({
  post,
  className,
  style,
  ...rest
}) => {
  const { title, lead, date, slug, header_image } = post;
  const postDate = React.useMemo(() => new Date(date), [date]);

  const variantColor = React.useMemo(
    () => generateVariantColor(getColorSchemeBySeed(slug) as FeaturedPostItemVariants),
    [slug]
  );

  return (
    <article
      className={clsx(
        'h-entry flex flex-col justify-between relative border-4 rounded-xl shadow-lg overflow-hidden',
        variantColor.border,
        className
      )}
      style={style}
      {...rest}
    >
      {header_image ? (
        <>
          <div role="presentation" className="absolute w-full h-full z-10">
            <Image src={header_image} layout="fill" objectFit="cover" />
          </div>
          <div
            role="presentation"
            className={clsx('absolute w-full h-full', variantColor.bg, 'bg-opacity-50 z-20')}
          />
          <div
            role="presentation"
            className="absolute w-full h-full bg-chungking-black bg-opacity-75 z-30"
          />
        </>
      ) : null}
      <div className="flex flex-col justify-between w-full h-full p-4 z-50 space-y-6">
        <div className="space-y-2">
          <time
            className="dt-published text-chungking-grey-400 text-xs lg:text-sm"
            dateTime={postDate.toISOString()}
          >
            {formatPostDate(postDate)}
          </time>
          {title ? (
            <h3 className="text-lg lg:text-xl font-semibold leading-tight">{title}</h3>
          ) : null}
          {lead ? <p className="text-sm lg:text-base text-chungking-grey-200">{lead}</p> : null}
        </div>
        <div>
          <Link href="/posts/[...slug]" as={`/posts/${slug}`} className="helper-link-cover group">
            <span className="group-hover:underline">Read more</span> &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
};
