import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import * as React from 'react';

import { MainContent } from '~/components/layout';
import { YouTubePreconnect } from '~/components/perf';
import { Post, PostBody, PostHeader, PostHeaderImage } from '~/modules/posts';
import CustomErrorPage from '~/pages/_error';
import { getAllPages, getPageBySlug } from '~/lib/pages';
import siteMetadata from '~/lib/data/site-metadata';
import markdownToHtml from '~/lib/markdown-to-html';
import { BasePageProps } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';

const contentDirectory = '_content/etc';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (params?.slug && !Array.isArray(params.slug)) {
    const page: BasePageProps = getPageBySlug(contentDirectory, params.slug, [
      'title',
      'lead',
      'header_image',
      'slug',
      'content',
    ]);
    const content = await markdownToHtml(page.content || '');

    return {
      props: { page: { ...page, content }, siteMetadata },
    };
  }

  return { props: { siteMetadata } };
};

type MarkdownPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const MarkdownPage: NextPage<MarkdownPageProps> = ({ page }) => {
  if (page) {
    const { title, lead, header_image, content } = page;
    return (
      <DefaultLayout>
        <YouTubePreconnect />
        <MainContent pageTitle={title}>
          <Post>
            {header_image && <PostHeaderImage src={header_image} alt={title} />}
            <PostHeader title={title} lead={lead} />
            <PostBody content={content} />
          </Post>
        </MainContent>
      </DefaultLayout>
    );
  }

  return <CustomErrorPage statusCode={404} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPages(contentDirectory, ['slug']);
  const paths = posts.map(post => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export default MarkdownPage;
