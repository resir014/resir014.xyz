import * as React from 'react';
import { Box } from '@resir014/chungking-react';
import PostMeta from './PostMeta';
import PostHCard from './post-h-card';
import { Container } from '~/components/layout';
import { PostKind } from '~/types/default';
import { SiteAuthor } from '~/lib/data/site-metadata';

interface PostHeaderProps {
  title?: string;
  lead?: string;
  date?: string;
  slug?: string;
  category?: PostKind;
  author?: SiteAuthor;
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, lead, date, author, category, slug }) => {
  return (
    <Box as="header" pt="xxl" px="lg">
      <Container className="space-y-8">
        <div className="space-y-4">
          {date && category && <PostMeta date={date} category={category} slug={slug} />}
          {title && (
            <h1 className="p-name text-3xl sm:text-4xl lg:text-5xl font-semibold">{title}</h1>
          )}
          {lead && <p className="p-summary text-lg sm:text-xl lg:text-2xl font-light">{lead}</p>}
        </div>
        {author && <PostHCard author={author} />}
      </Container>
    </Box>
  );
};

export default PostHeader;
