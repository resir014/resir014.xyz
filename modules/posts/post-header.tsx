import * as React from 'react';
import { Box } from '@resir014/chungking-react';
import PostMeta from './PostMeta';
import PostHCard from './PostHCard';
import { Container } from '~/components/layout';
import { PostKind, SiteAuthor } from '~/types/default';

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
      <Container>
        {date && category && <PostMeta date={date} category={category} mb="md" slug={slug} />}
        {title && (
          <h1 className="p-name text-3xl sm:text-4xl lg:text-5xl font-semibold">{title}</h1>
        )}
        {lead && (
          <p className="p-summary mt-4 text-xl sm:text-2xl lg:text-3xl font-light">{lead}</p>
        )}
        {author && <PostHCard author={author} />}
      </Container>
    </Box>
  );
};

export default PostHeader;
