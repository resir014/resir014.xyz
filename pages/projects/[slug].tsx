import * as React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Box } from '@resir014/chungking-core'
import CustomErrorPage from '~/pages/_error'
import { Container, Content, Page } from '~/components/layout'
import { YouTubePreconnect } from '~/components/perf'
import { BaseProjectProps } from '~/types/projects'
import { Post } from '~/modules/posts'
import { ProjectBody, ProjectCard } from '~/modules/projects'
import { getAllProjects, getProjectBySlug } from '~/lib/projects'
import markdownToHtml from '~/lib/markdown-to-html'
import { SiteMetadata } from '~/types/default'

import siteMetadata from '~/_data/siteMetadata.json'

type BlogPostPageProps = {
  project?: BaseProjectProps
  siteMetadata: SiteMetadata
}

const ProjectsDetailPage: NextPage<BlogPostPageProps> = ({ project }) => {
  if (project) {
    const { title, description, header_image, content } = project
    return (
      <Page pageTitle={`${title} · Projects`}>
        <NextSeo
          openGraph={{
            description,
            images: [
              {
                url: `${siteMetadata.siteUrl}${header_image}`,
                width: 1200,
                height: 630,
                alt: title
              }
            ]
          }}
        />
        <YouTubePreconnect />
        <Content>
          <Post>
            <Box as="header" pt="xxl" px="lg">
              <Container size="lg">
                <ProjectCard project={project} />
              </Container>
            </Box>
            <ProjectBody content={content} />
          </Post>
        </Content>
      </Page>
    )
  }

  return <CustomErrorPage statusCode={404} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (ctx.params && !Array.isArray(ctx.params?.slug)) {
    const project = getProjectBySlug(ctx.params.slug, [
      'category',
      'title',
      'description',
      'date',
      'header_image',
      'project_url',
      'tags',
      'slug',
      'content'
    ])

    const content = await markdownToHtml(project.content || '')

    return {
      props: { siteMetadata, project: { ...project, content } }
    }
  }

  return {
    props: { siteMetadata }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = getAllProjects(['slug'])

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug
        }
      }
    }),
    fallback: false
  }
}

export default ProjectsDetailPage
