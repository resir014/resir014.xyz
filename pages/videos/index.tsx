import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';

import { MainContent } from '~/components/layout';
import { PostBody, PostHeader } from '~/modules/posts';
import { renderVideoList } from '~/modules/video';
import { getAllPosts } from '~/lib/posts';
import siteMetadata from '~/lib/data/site-metadata';
import { BaseVideoProps } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';

export const getStaticProps = async () => {
  const allPosts: BaseVideoProps[] = await getAllPosts(
    ['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'],
    'video'
  );

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
          <div className="space-y-12">{renderVideoList(allPosts, 'videos')}</div>
        </PostBody>
      </MainContent>
    </DefaultLayout>
  );
};

export default VideosIndexPage;
