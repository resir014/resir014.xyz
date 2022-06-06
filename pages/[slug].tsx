import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import * as React from 'react';

import { MainContent } from '~/components/layout';
import { YouTubePreconnect } from '~/components/perf';
import { Post, PostHeader, PostHeaderImage } from '~/modules/posts';
import CustomErrorPage from '~/pages/_error';
import siteMetadata from '~/lib/data/site-metadata';
import { BasePageProps } from '~/types/posts';
import DefaultLayout from '~/layouts/default-layout';
import { PageBody } from '~/components/page';
import { getPageBySlug } from '~/lib/item-by-slug';
import { getAllPages } from '~/lib/pages';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (params?.slug && !Array.isArray(params.slug)) {
    const page: BasePageProps = getPageBySlug(params.slug, [
      'layout',
      'title',
      'lead',
      'header_image',
      'slug',
      'content',
    ]);

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
            {header_image && <PostHeaderImage src={header_image} alt={title} />}
            <PostHeader title={title} lead={lead} />
            <PageBody htmlContent={content} />
          </Post>
        </MainContent>
      </DefaultLayout>
    );
  }

  return <CustomErrorPage statusCode={404} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPages(['slug']);
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
