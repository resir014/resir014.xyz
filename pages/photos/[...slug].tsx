import * as React from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';

import { getPostBySlug, getAllPosts } from '~/lib/posts';
import markdownToHtml from '~/lib/markdown-to-html';

import { Content } from '~/components/layout';
import { YouTubePreconnect } from '~/components/perf';
import { Post, PostHeader } from '~/modules/posts';
import { PhotoPostBody } from '~/modules/photos';
import CustomErrorPage from '~/pages/_error';
import { BasePhotoProps } from '~/types/posts';
import siteMetadata, { SiteMetadata } from '~/lib/data/site-metadata';
import DefaultLayout from '~/layouts/default-layout';

type PhotoPostPageProps = {
  post?: BasePhotoProps;
  siteMetadata: SiteMetadata;
};

const PhotoPostPage: NextPage<PhotoPostPageProps> = ({ post }) => {
  if (post) {
    const { category, date, header_image, slug, content } = post;
    return (
      <DefaultLayout>
        <YouTubePreconnect />
        <Content pageTitle="Photo posted by @resir014">
          <NextSeo
            openGraph={{
              type: 'article',
              title: 'Photo posted by @resir014',
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
                  alt: 'Photo posted by @resir014',
                },
              ],
            }}
          />
          <Post>
            <PostHeader category={category} date={date} slug={slug} />
            <PhotoPostBody image={header_image} content={content} />
          </Post>
        </Content>
      </DefaultLayout>
    );
  }

  return <CustomErrorPage statusCode={404} />;
};

export const getStaticProps: GetStaticProps = async ctx => {
  if (ctx.params && Array.isArray(ctx.params.slug)) {
    const post = getPostBySlug(
      ctx.params.slug,
      ['category', 'title', 'lead', 'date', 'header_image', 'slug', 'content'],
      'photo'
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
  const posts = getAllPosts(['slug'], 'photo');

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

export default PhotoPostPage;
