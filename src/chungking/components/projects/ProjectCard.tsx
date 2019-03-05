import styled from '@emotion/styled'

import { colors } from '../../styles/variables'
import { ChildImageSharp } from '../../../types/gatsby'

import { PageThumbnail, PageThumbnailImage } from '../page'
import { Badge } from '../ui'
import { ProjectTitle } from './ProjectTitle'
import { ProjectSubtitle } from './ProjectSubtitle'

interface ProjectCardProps {
  title: string
  description?: string
  tags?: string[]
  image?: {
    childImageSharp: ChildImageSharp
  }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, tags }) => (
  <Root>
    {image && (
      <PageThumbnail>
        <PageThumbnailImage fluid={image.childImageSharp.fluid} alt={title} />
      </PageThumbnail>
    )}
    <Inner>
      {tags ? (
        <ProjectTags>
          {tags.map(tag => (
            <Badge key={tag} className="p-category">
              {tag}
            </Badge>
          ))}
        </ProjectTags>
      ) : null}
      <ProjectTitle className="p-name">{title}</ProjectTitle>
      {description ? <ProjectSubtitle className="p-summary">{description}</ProjectSubtitle> : null}
    </Inner>
  </Root>
)

const Root = styled('section')`
  margin: 1.5rem 0;
  padding: 0;
  background: linear-gradient(to right, ${colors.ultramarine30}, ${colors.green30});
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0 2px 4px 0;
`

const Inner = styled('div')`
  padding: 1rem 1.5rem 1.5rem;
`

const ProjectTags = styled('div')`
  margin-bottom: 0.75rem;

  ${Badge} + ${Badge} {
    margin-left: 0.5rem;
  }
`
