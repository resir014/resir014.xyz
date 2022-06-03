import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';

import { MainContent } from '~/components/layout';
import { FeaturedPostList, PostList, PostHeader } from '~/modules/posts';
import siteMetadata from '~/lib/data/site-metadata';
import { getAllPosts, getFeaturedArticles } from '~/lib/posts';
import { generateRSS } from '~/lib/rss';
import { BasePostProps } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';
import { PageBody } from '~/components/page';
import { Divider } from '~/components/ui';

export const getStaticProps = async () => {
  const featuredPosts: BasePostProps[] = await getFeaturedArticles(3);
  const allPosts: BasePostProps[] = await getAllPosts(
    ['category', 'title', 'lead', 'slug', 'date', 'content'],
    'article'
  );
  const feed = await generateRSS(allPosts);
  const fs = await import('fs');

  fs.mkdirSync('./public/posts', { recursive: true });
  fs.writeFileSync('./public/posts/rss.xml', feed.rss2());
  fs.writeFileSync('./public/posts/atom.xml', feed.atom1());
  fs.writeFileSync('./public/posts/feed.json', feed.json1());

  return {
    props: { allPosts, featuredPosts, siteMetadata },
  };
};

type PostsIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostsIndexPage: NextPage<PostsIndexPageProps> = ({ featuredPosts, allPosts }) => (
  <DefaultLayout>
    <MainContent pageTitle="Posts">
      <PostHeader title="Posts" />
      <PageBody>
        <div className="space-y-12">
          <FeaturedPostList title="Featured posts" posts={featuredPosts} />
          <Divider size="lg" />
          <PostList title="Other posts" posts={allPosts} />
        </div>
      </PageBody>
    </MainContent>
  </DefaultLayout>
);

export default PostsIndexPage;
