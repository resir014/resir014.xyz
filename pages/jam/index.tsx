import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';

import { Stack } from '@resir014/chungking-react';
import { MainContent } from '~/components/layout';
import { PostBody, PostHeader } from '~/modules/posts';
import { renderVideoList } from '~/modules/video';
import { getAllPosts } from '~/lib/posts';
import siteMetadata from '~/lib/data/site-metadata';
import { renderMarkdown } from '~/lib/markdown-to-html';
import { BaseJamProps } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';

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
    <DefaultLayout>
      <MainContent pageTitle="Jam">
        <PostHeader title="Jam" lead="What is @resir014 listening to right now?" />
        <PostBody>
          <Stack spacing="xxl">{renderVideoList(allPosts, 'jam')}</Stack>
        </PostBody>
      </MainContent>
    </DefaultLayout>
  );
};

export default JamIndexPage;
