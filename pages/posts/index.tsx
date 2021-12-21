import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';

import { Content } from '~/components/layout';
import { FeaturedPostList, PostList, PostHeader } from '~/modules/posts';
import siteMetadata from '~/lib/data/site-metadata';
import { getAllPosts, getFeaturedArticles } from '~/lib/posts';
import { generateRSS } from '~/lib/rss';
import { BasePostProps, PostMetadata } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';
import { PageBody } from '~/components/page';

export const getStaticProps = async () => {
  const featuredPosts: BasePostProps[] = getFeaturedArticles(3);
  const allPosts: PostMetadata[] = getAllPosts(
    ['category', 'title', 'lead', 'slug', 'date'],
    'article'
  );
  const rss = generateRSS(allPosts);
  const fs = await import('fs');

  fs.mkdirSync('./public/posts', { recursive: true });
  fs.writeFileSync('./public/posts/rss.xml', rss);

  return {
    props: { allPosts, featuredPosts, siteMetadata },
  };
};

type PostsIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostsIndexPage: NextPage<PostsIndexPageProps> = ({ featuredPosts, allPosts }) => (
  <DefaultLayout>
    <Content pageTitle="Posts">
      <PostHeader title="Posts" />
      <PageBody>
        <div className="space-y-12">
          <FeaturedPostList title="Featured posts" posts={featuredPosts} />
          <PostList title="Other posts" posts={allPosts} />
        </div>
      </PageBody>
    </Content>
  </DefaultLayout>
);

export default PostsIndexPage;
