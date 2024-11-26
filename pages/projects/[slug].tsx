import * as React from 'react';
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { MainContent } from '~/components/layout';
import { YouTubePreconnect } from '~/components/perf';
import type { BaseProjectProps } from '~/types/projects';
import { ProjectBody, ProjectHeader } from '~/modules/projects';
import { getAllProjects, getProjectBySlug } from '~/lib/projects';
import siteMetadata, { SiteMetadata } from '~/lib/data/site-metadata';
import DefaultLayout from '~/layouts/default-layout';
import { Page } from '~/components/page';

type BlogPostPageProps = {
  project: BaseProjectProps;
  siteMetadata: SiteMetadata;
};

const ProjectsDetailPage: NextPage<BlogPostPageProps> = ({ project }) => {
  const { title, description, header_image, content } = project;

  return (
    <DefaultLayout>
      <YouTubePreconnect />
      <MainContent pageTitle={`${title} · Projects`}>
        <NextSeo
          openGraph={{
            description,
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
        <Page>
          <ProjectHeader project={project} />
          <ProjectBody htmlContent={content} />
        </Page>
      </MainContent>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async ctx => {
  if (ctx.params?.slug && !Array.isArray(ctx.params.slug)) {
    const project = await getProjectBySlug(ctx.params.slug, [
      'category',
      'title',
      'description',
      'date',
      'header_image',
      'project_url',
      'tags',
      'slug',
      'content',
    ]);

    if (!project) {
      return { notFound: true };
    }

    return {
      props: { siteMetadata, project },
    };
  }

  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getAllProjects(['slug']);
  const paths: GetStaticPathsResult['paths'] = [];

  for (const project of projects) {
    paths.push({
      params: {
        slug: project.slug,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export default ProjectsDetailPage;
