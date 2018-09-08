import * as React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'

import { colors, fonts, pxSizes } from '../../styles/variables'
import { ProjectField } from '../../types/fields'
import { getEmSize } from '../../styles/mixins'

const StyledProjectItem = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 2rem;
  flex: 1 1 100%;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin: 0 1rem 2rem;
    flex: 0 1 calc(50% - 2rem);
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.xl)}) {
    flex: 0 1 calc(33.3% - 2rem);
  }
`

const ProjectYear = styled('span')`
  display: inline-block;
  font-size: 1.25rem;
  font-family: ${fonts.sansSerif};
  color: ${colors.grey50};
`

const ProjectTitle = styled('h4')``

const ProjectHeader = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  background: ${(props: ProjectTitleProps) => colorByCategory(props.category)};
  border-radius: 4px;

  ${ProjectTitle} {
    flex: 1 1 auto;
    margin: 0;
    color: ${colors.white};
  }
`

const UnstyledLink = css`
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const ProjectLink = styled(Link)(UnstyledLink)

const JumpToProjectLink = styled('a')(UnstyledLink)

const ProjectTags = styled('div')`
  margin-bottom: 1rem;
  span {
    display: inline-block;
    padding: 0.25em 0.5em;
    font-size: 85%;
    color: ${colors.white};
    background-color: ${colors.grey70};
    border-radius: 3px;
  }

  span + span {
    margin-left: 0.5rem;
  }
`

const ProjectDetailBox = styled('div')`
  padding: 1rem 0.5rem;
  flex: 1 0 auto;

  p {
    margin-top: 0;
  }
`

const ProjectFooter = styled('div')`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${colors.grey30};
`

interface ProjectTitleProps {
  category: string
}

const ProjectItem: React.SFC<ProjectField> = ({ node }) => {
  const tags = node.fields.tags ? (JSON.parse(node.fields.tags) as string[]) : undefined
  const { title } = node.frontmatter
  const { description, lead, category, year, project_url, slug, jumpToProject } = node.fields

  return (
    <StyledProjectItem>
      {jumpToProject === 'true' && project_url
        ? renderLink(title, category, project_url, true)
        : renderLink(title, category, slug, false)}
      <ProjectDetailBox>
        <ProjectYear>{year}</ProjectYear>
        <p
          dangerouslySetInnerHTML={{
            __html: description || lead
          }}
        />
        <ProjectFooter>
          {tags ? (
            <ProjectTags>
              {tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </ProjectTags>
          ) : null}
        </ProjectFooter>
      </ProjectDetailBox>
    </StyledProjectItem>
  )
}

const colorByCategory = (category: string) => {
  switch (category) {
    case 'web':
      return `linear-gradient(to right, ${colors.blue70}, ${colors.blue50})`
    case 'oss':
      return `linear-gradient(to right, ${colors.purple70}, ${colors.purple50})`
    case 'other':
      return `linear-gradient(to right, ${colors.magenta70}, ${colors.magenta50})`
    default:
      return `linear-gradient(to right, ${colors.grey70}, ${colors.grey50})`
  }
}

const renderLink = (title: string, category: string, url: string, jumpToProject: boolean) => {
  if (jumpToProject) {
    return (
      <JumpToProjectLink href={url} target="_blank" rel="noopener noreferrer">
        <ProjectHeader category={category}>
          <ProjectTitle>{title}</ProjectTitle>
        </ProjectHeader>
      </JumpToProjectLink>
    )
  }

  return (
    <ProjectLink to={url}>
      <ProjectHeader category={category}>
        <ProjectTitle>{title}</ProjectTitle>
      </ProjectHeader>
    </ProjectLink>
  )
}

export default ProjectItem
