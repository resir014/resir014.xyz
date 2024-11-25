import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';

import { MainContent } from '~/components/layout';
import { PostBody, PostHeader } from '~/modules/posts';
import { renderVideoList } from '~/modules/video';
import { getAllPosts } from '~/lib/posts';
import siteMetadata from '~/lib/data/site-metadata';
import type { BaseJamProps } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';

export const getStaticProps = async () => {
  const allPosts: BaseJamProps[] = await getAllPosts(
    ['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'],
    'jam'
  );

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
          <div className="space-y-12">{renderVideoList(allPosts, 'jam')}</div>
        </PostBody>
      </MainContent>
    </DefaultLayout>
  );
};

export default JamIndexPage;
