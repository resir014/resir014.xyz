import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';

import { Stack } from '@resir014/chungking-react';
import { Content, Page } from '~/components/layout';
import { PostBody, PostHeader } from '~/modules/posts';
import { renderVideoList } from '~/modules/video';
import { getAllPosts } from '~/lib/posts';
import siteMetadata from '~/lib/data/site-metadata';
import { renderMarkdown } from '~/lib/markdown-to-html';
import { BaseJamProps } from '~/types/posts';

export const getStaticProps = async () => {
  const allPosts: BaseJamProps[] = getAllPosts(
    ['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'],
    'jam'
  ).map(post => ({ ...post, content: renderMarkdown(post.content || '') }));

  return {
    props: { allPosts, siteMetadata },
  };
};

type JamIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const JamIndexPage: NextPage<JamIndexPageProps> = ({ allPosts }) => {
  return (
    <Page pageTitle="Jam">
      <Content>
        <PostHeader title="Jam" lead="What is @resir014 listening to right now?" />
        <PostBody>
          <Stack spacing="xxl">{renderVideoList(allPosts, 'jam')}</Stack>
        </PostBody>
      </Content>
    </Page>
  );
};

export default JamIndexPage;
