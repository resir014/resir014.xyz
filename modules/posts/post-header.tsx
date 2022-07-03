import * as React from 'react';
import { Container } from '~/components/layout';
import { PostKind } from '~/types/default';
import { PostMeta } from './post-meta';

export interface PostHeaderProps {
  title?: string;
  lead?: string;
  date?: string;
  slug?: string;
  category?: PostKind;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ title, lead, date, category, slug }) => {
  return (
    <header className="px-4 lg:px-6 pt-12">
      <Container className="space-y-8">
        <div className="space-y-4">
          {date && category ? <PostMeta date={date} category={category} slug={slug} /> : null}
          {title ? (
            <h1 className="p-name text-3xl sm:text-4xl lg:text-5xl font-semibold">{title}</h1>
          ) : null}
          {lead ? (
            <p className="p-summary text-lg sm:text-xl lg:text-2xl font-light">{lead}</p>
          ) : null}
        </div>
      </Container>
    </header>
  );
};
