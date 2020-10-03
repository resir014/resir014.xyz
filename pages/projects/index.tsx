import { InferGetStaticPropsType, NextPage } from 'next'
import * as React from 'react'
import { Stack } from '~/components/chungking-core'
import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader } from '~/modules/posts'
import { FeaturedProjectCard, ProjectItemList } from '~/modules/projects'
import { getAllProjects, getFeaturedProject, filterProjectsByCategory } from '~/lib/projects'
import { ProjectMetadata } from '~/types/projects'

export const getStaticProps = async () => {
  const allProjects: ProjectMetadata[] = getAllProjects(['category', 'title', 'description', 'year', 'project_url', 'slug'])
  const featuredProject: ProjectMetadata = getFeaturedProject([
    'category',
    'title',
    'header_image',
    'description',
    'tags',
    'project_url',
    'slug'
  ])

  return {
    props: { allProjects, featuredProject }
  }
}

type ProjectsIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const ProjectsIndexPage: NextPage<ProjectsIndexPageProps> = ({ allProjects, featuredProject }) => {
  const filteredProjects = filterProjectsByCategory(allProjects)

  return (
    <Page pageTitle="Projects">
      <Content>
        <PostHeader title="Projects" />
        <PostBody>
          <Stack spacing="xxl">
            <FeaturedProjectCard project={featuredProject} />
            {filteredProjects.map((filteredProject) => (
              <ProjectItemList key={filteredProject.category} title={filteredProject.title} projects={filteredProject.projects} />
            ))}
          </Stack>
        </PostBody>
      </Content>
    </Page>
  )
}

export default ProjectsIndexPage
