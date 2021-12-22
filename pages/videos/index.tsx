import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';

import { Stack } from '@resir014/chungking-react';
import { MainContent } from '~/components/layout';
import { PostBody, PostHeader } from '~/modules/posts';
import { renderVideoList } from '~/modules/video';
import { getAllPosts } from '~/lib/posts';
import siteMetadata from '~/lib/data/site-metadata';
import { renderMarkdown } from '~/lib/markdown-to-html';
import { BaseVideoProps } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';

export const getStaticProps = async () => {
  const allPosts: BaseVideoProps[] = getAllPosts(
    ['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'],
    'video'
  ).map(post => ({ ...post, content: renderMarkdown(post.content || '') }));

  return {
    props: { allPosts, siteMetadata },
  };
};

type VideosIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const VideosIndexPage: NextPage<VideosIndexPageProps> = ({ allPosts }) => {
  return (
    <DefaultLayout>
      <MainContent pageTitle="Videos">
        <PostHeader title="Videos" lead="What is @resir014 watching right now?" />
        <PostBody>
          <Stack spacing="xxl">{renderVideoList(allPosts, 'videos')}</Stack>
        </PostBody>
      </MainContent>
    </DefaultLayout>
  );
};

export default VideosIndexPage;
