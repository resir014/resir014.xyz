import * as React from 'react'

import { PageMetaItem, BookmarkLink } from '../../components/page'
import { PostIndexItemMeta } from '../../components/posts-index'
import { FeaturedProject, ProjectCard, ProjectItem } from '../../components/projects'
import { H2, H3, H4 } from '../../components/markdown'

import getFeaturedProject from '../../utils/getFeaturedProject'
import { ProjectField } from '../../types/fields'
import { SiteData } from '../../types/gatsby'

import WrapperRoot from './WrapperRoot'

interface ProjectComponentsSpecsProps {
  data: {
    site: SiteData
    projects: {
      edges: ProjectField[]
    }
  }
}

const ProjectComponentsSpecs: React.FC<ProjectComponentsSpecsProps> = ({ data }) => {
  const testProject = getFeaturedProject(data.projects.edges, 'Broville v11')
  const testProjectNode = testProject.node
  const testProjectTags = testProjectNode.fields.tags
    ? (JSON.parse(testProjectNode.fields.tags) as string[])
    : undefined

  return (
    <>
      <H2>Site Components</H2>

      <H3>Posts</H3>
      <H4>Bookmark Link</H4>
      <WrapperRoot>
        <BookmarkLink
          title="Accessibility is not a “React Problem”"
          link="https://www.netlify.com/blog/2019/02/25/accessibility-is-not-a-react-problem/"
        />
      </WrapperRoot>
      <H4>Post Metadata</H4>
      <WrapperRoot>
        <PostIndexItemMeta>
          <PageMetaItem>
            <time className="dt-published" dateTime="2019-03-03T12:00:00">
              03 March 2019
            </time>
          </PageMetaItem>
          <PageMetaItem className="p-category">Category</PageMetaItem>
        </PostIndexItemMeta>
      </WrapperRoot>

      <H3>Projects</H3>
      <H4>Featured Project</H4>
      <FeaturedProject key={testProject.node.frontmatter.title} node={testProject.node} />
      <H4>Project Card</H4>
      <ProjectCard
        title={testProjectNode.frontmatter.title}
        description={testProjectNode.fields.description || testProjectNode.fields.lead}
        tags={testProjectTags}
        mb="lg"
      />
      <ProjectCard
        image={testProjectNode.frontmatter.header_image}
        title={testProjectNode.frontmatter.title}
        description={testProjectNode.fields.description || testProjectNode.fields.lead}
        tags={testProjectTags}
      />
      <H4>Project Item List</H4>
      <ProjectItem node={testProjectNode} />
    </>
  )
}

export default ProjectComponentsSpecs
