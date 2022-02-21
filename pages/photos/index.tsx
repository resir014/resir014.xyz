import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';

import { MainContent } from '~/components/layout';
import { PostBody, PostHeader } from '~/modules/posts';
import { getAllPosts } from '~/lib/posts';
import { renderMarkdown } from '~/lib/markdown-to-html';
import PhotoListItem from '~/modules/photos/PhotoListItem';
import siteMetadata from '~/lib/data/site-metadata';
import { BasePhotoProps } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';

export const getStaticProps = async () => {
  const allPosts: BasePhotoProps[] = getAllPosts(
    ['category', 'title', 'slug', 'date', 'header_image', 'featured', 'content'],
    'photo'
  ).map(post => ({ ...post, content: renderMarkdown(post.content || '') }));

  return {
    props: { allPosts, siteMetadata },
  };
};

type PhotosIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PhotosIndexPage: NextPage<PhotosIndexPageProps> = ({ allPosts }) => {
  return (
    <DefaultLayout>
      <MainContent pageTitle="Photos">
        <PostHeader title="Photos" lead="Sometimes I go outside and take photos with my camera." />
        <PostBody>
          <div className="space-y-[64px] mt-6">
            {allPosts.map(photo => (
              <PhotoListItem key={photo.slug} photo={photo} />
            ))}
          </div>
        </PostBody>
      </MainContent>
    </DefaultLayout>
  );
};

export default PhotosIndexPage;
