import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import * as React from 'react';

import { MainContent } from '~/components/layout';
import { YouTubePreconnect } from '~/components/perf';
import { Post, PostBody, PostHeader, PostHeaderImage } from '~/modules/posts';
import CustomErrorPage from '~/pages/_error';
import { getAllPages } from '~/lib/pages';
import siteMetadata from '~/lib/data/site-metadata';
import type { BasePageProps } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';
import { getPageBySlug } from '~/lib/item-by-slug';

const contentDirectory = '_content/etc';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (params?.slug && !Array.isArray(params.slug)) {
    const page: BasePageProps = await getPageBySlug(
      params.slug,
      ['title', 'lead', 'header_image', 'slug', 'content'],
      contentDirectory
    );

    return {
      props: { page, siteMetadata },
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
            {header_image ? <PostHeaderImage src={header_image} alt={title} /> : null}
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
  const posts = await getAllPages(['slug'], contentDirectory);
  const paths = posts.map(post => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default MarkdownPage;
