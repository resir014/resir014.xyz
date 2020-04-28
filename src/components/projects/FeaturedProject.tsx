import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import {
  Text,
  Heading,
  P,
  mediaQueries,
  colors,
  shadows,
  space,
  Badge,
  NavLinkButton,
  Box,
  BoxProps
} from '../chungking-core'
import FeaturedProjectThumbnail from './FeaturedProjectThumbnail'

import { ProjectField } from '../../types/fields'
import ProjectTags from './ProjectTags'

const FeaturedProjectWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  color: ${colors.white};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: ${shadows.single};

  ${mediaQueries.md} {
    flex-direction: row;
  }

  .column {
    flex: 1;
  }
`

const FeaturedProjectDetails = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: linear-gradient(to right, ${colors.ultramarine30}, ${colors.green30});
`

const FeaturedProjectHeading = styled('div')`
  color: ${colors.white};
  margin: 0;
`

const FeaturedProjectDescription = styled('div')`
  flex: 1;

  p {
    margin: 0;
  }
`

const FeaturedProjectFooter = styled('div')`
  margin-top: ${space.xl}px;
`

interface FeaturedProjectProps extends ProjectField, BoxProps {
  className?: string
  style?: React.CSSProperties
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ node, className, style, ...rest }) => {
  const { header_image } = node.frontmatter
  const tags = node.fields.tags ? (JSON.parse(node.fields.tags) as string[]) : undefined

  return (
    <FeaturedProjectWrapper as="section" className={className} style={style} {...rest}>
      {header_image ? <FeaturedProjectThumbnail className="column" image={header_image} /> : null}
      <FeaturedProjectDetails className="column">
        <FeaturedProjectHeading>
          <Text
            scale={300}
            letterSpacing="0.01em"
            fontWeight={300}
            css={css`
              text-transform: uppercase;
            `}
          >
            Featured project
          </Text>
          <Heading
            as="h3"
            scale={700}
            mt="xxs"
            mb="sm"
            css={css`
              color: #00f281;
            `}
          >
            {node.frontmatter.title}
          </Heading>
        </FeaturedProjectHeading>
        <FeaturedProjectDescription>
          <P>{node.fields.description}</P>
          {tags ? (
            <ProjectTags>
              {tags.map(tag => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </ProjectTags>
          ) : null}
        </FeaturedProjectDescription>
        <FeaturedProjectFooter>
          <NavLinkButton ghosted size="lg" to={node.fields.slug}>
            Visit project &rarr;
          </NavLinkButton>
        </FeaturedProjectFooter>
      </FeaturedProjectDetails>
    </FeaturedProjectWrapper>
  )
}

export default FeaturedProject
