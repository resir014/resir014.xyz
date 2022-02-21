import * as React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';

import { getPostBySlug, getAllPosts } from '~/lib/posts';
import markdownToHtml from '~/lib/markdown-to-html';

import { Container, MainContent } from '~/components/layout';
import { LiteYouTube, VideoCard } from '~/modules/video';
import { YouTubePreconnect } from '~/components/perf';
import { Post, PostBody, PostHeader } from '~/modules/posts';
import CustomErrorPage from '~/pages/_error';
import { BaseJamProps } from '~/types/posts';
import siteMetadata, { SiteMetadata } from '~/lib/data/site-metadata';
import DefaultLayout from '~/layouts/default-layout';

type JamPostPageProps = {
  post?: BaseJamProps;
  siteMetadata: SiteMetadata;
};

const JamPostPage: NextPage<JamPostPageProps> = ({ post }) => {
  if (post) {
    const { title, date, youtube_embed_id, category, slug, content } = post;
    return (
      <DefaultLayout>
        <NextSeo
          openGraph={{
            type: 'article',
            title,
            description: 'Jam posted by @resir014',
            article: {
              authors: [siteMetadata.author.name],
              publishedTime: date,
              section: category,
            },
          }}
        />
        <YouTubePreconnect />
        <MainContent pageTitle={title}>
          <Post>
            <PostHeader title={title} category={category} date={date} slug={slug} />
            <div className="px-4 lg:px-6 pt-12">
              <Container size="lg">
                <VideoCard embed={<LiteYouTube videoId={youtube_embed_id} />} />
              </Container>
            </div>
            <PostBody content={content} />
          </Post>
        </MainContent>
      </DefaultLayout>
    );
  }

  return <CustomErrorPage statusCode={404} />;
};

export const getStaticProps: GetStaticProps = async ctx => {
  if (ctx.params && Array.isArray(ctx.params.slug)) {
    const post = getPostBySlug(
      ctx.params.slug,
      ['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'],
      'jam'
    );

    const content = await markdownToHtml(post.content || '');

    return {
      props: { siteMetadata, post: { ...post, content } },
    };
  }

  return {
    props: { siteMetadata },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'], 'jam');

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug.split('/').filter(Boolean),
        },
      };
    }),
    fallback: false,
  };
};

export default JamPostPage;
