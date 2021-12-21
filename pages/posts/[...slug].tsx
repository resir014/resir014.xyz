import * as React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';

import { getPostBySlug, getAllPosts } from '~/lib/posts';
import markdownToHtml from '~/lib/markdown-to-html';

import { Content } from '~/components/layout';
import { YouTubePreconnect } from '~/components/perf';
import { Post, PostBody, PostHeader, PostHeaderImage } from '~/modules/posts';
import CustomErrorPage from '~/pages/_error';
import { BasePostProps } from '~/types/posts';
import siteMetadata, { SiteMetadata } from '~/lib/data/site-metadata';
import DefaultLayout from '~/layouts/default-layout';

type BlogPostPageProps = {
  post?: BasePostProps;
  siteMetadata: SiteMetadata;
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  const { author } = siteMetadata;

  if (post) {
    const { title, lead, category, date, header_image, syndication, slug, content } = post;
    return (
      <DefaultLayout>
        <YouTubePreconnect />
        <Content pageTitle={title}>
          <NextSeo
            openGraph={{
              type: 'article',
              title,
              description: lead,
              article: {
                authors: [siteMetadata.author.name],
                publishedTime: date,
                section: category,
              },
              images: [
                {
                  url: `${siteMetadata.siteUrl}${header_image}`,
                  width: 1200,
                  height: 630,
                  alt: title,
                },
              ],
            }}
          />
          <Post>
            {header_image && <PostHeaderImage src={header_image} alt={title} />}
            <PostHeader title={title} lead={lead} category={category} date={date} slug={slug} />
            <PostBody content={content} syndication={syndication} author={author} />
          </Post>
        </Content>
      </DefaultLayout>
    );
  }

  return <CustomErrorPage statusCode={404} />;
};

export const getStaticProps: GetStaticProps = async ctx => {
  if (ctx.params && Array.isArray(ctx.params.slug)) {
    const post = getPostBySlug(ctx.params.slug, [
      'category',
      'title',
      'lead',
      'date',
      'header_image',
      'slug',
      'content',
      'syndication',
    ]);

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
  const posts = getAllPosts(['slug']);

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

export default BlogPostPage;
