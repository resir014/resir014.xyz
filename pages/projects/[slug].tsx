import * as React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import CustomErrorPage from '~/pages/_error'
import { Box } from '~/components/chungking-core'
import { Container, Content, Page } from '~/components/layout'
import { YouTubePreconnect } from '~/components/perf'
import { BaseProjectProps } from '~/types/projects'
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
    const { title, content } = project
    return (
      <Page pageTitle={`${title} · Projects`}>
        <YouTubePreconnect />
        <Content>
          <Box as="header" pt="xxl" px="lg">
            <Container size="lg">
              <ProjectCard project={project} />
            </Container>
          </Box>
          <ProjectBody content={content} />
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
