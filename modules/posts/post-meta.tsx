import * as React from 'react';
import { PostKind } from '~/types/default';
import siteMetadata from '~/lib/data/site-metadata';
import { slugByCategory } from './utils/slug-by-category';
import { PostDate } from './post-date';

export interface PostMetaProps extends React.ComponentPropsWithoutRef<'section'> {
  date: string;
  category: PostKind;
  slug?: string;
  disableMetaClick?: boolean;
}

export const PostMeta: React.FC<PostMetaProps> = ({
  className,
  style,
  date,
  category,
  slug,
  disableMetaClick,
  ...rest
}) => {
  const postDate = React.useMemo(() => new Date(date), [date]);

  const renderPermalink = () => {
    if (slug) {
      return (
        <a
          className="u-url hidden"
          href={`${siteMetadata.siteUrl}${slugByCategory(slug, category)}`}
        >
          Permalink
        </a>
      );
    }

    return null;
  };

  return (
    <section className={className} style={style} {...rest}>
      <PostDate
        href={disableMetaClick ? undefined : slugByCategory(slug, category)}
        date={postDate.toString()}
      />
      {renderPermalink()}
    </section>
  );
};
