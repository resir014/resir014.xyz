import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'

import { Text, Heading, colors, shadows, Badge, Box, BoxProps, Anchor } from '@resir014/chungking-react'
import { P } from '~/modules/markdown'

import ProjectTags from './ProjectTags'
import { ProjectMetadata } from '~/types/projects'

const FeaturedProjectWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  color: ${colors.white};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: ${shadows.single};

  .column {
    flex: 1;
  }
`

const FeaturedProjectDetails = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${colors.ultramarine[500]};
  background-image: linear-gradient(to right, ${colors.ultramarine[500]}, ${colors.blue[500]});
`

interface FeaturedProjectCardProps extends BoxProps {
  className?: string
  style?: React.CSSProperties
  project: ProjectMetadata
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ className, style, project, ...rest }) => {
  const { header_image, title, description, tags, slug } = project
  return (
    <FeaturedProjectWrapper as="section" className={className} style={style} {...rest}>
      {header_image && (
        <Box display={['none', null, null, 'block']} position="relative" width="100%" height="100%">
          <Image
            loading="lazy"
            src={header_image}
            alt={title}
            width={1140}
            height={671}
            unoptimized
            layout="responsive"
            css={css`
              object-fit: cover;
            `}
          />
        </Box>
      )}
      <FeaturedProjectDetails className="column">
        <Box>
          <Text
            variant={300}
            letterSpacing="0.01em"
            fontWeight={300}
            fontFamily="monospace"
            color="white"
            css={css`
              text-transform: uppercase;
            `}
          >
            Featured project
          </Text>
          <Heading as="h2" variant={700} mt="xxs" mb="sm" color="turquoise.400">
            {title}
          </Heading>
        </Box>
        <Box flex="1">
          <P m={0}>{description}</P>
          {tags ? (
            <ProjectTags>
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </ProjectTags>
          ) : null}
        </Box>
        <Box mt="xl">
          <Link href="/projects/[slug]" as={`/projects/${slug}`} passHref>
            <Anchor variant={500}>Visit project &rarr;</Anchor>
          </Link>
        </Box>
      </FeaturedProjectDetails>
    </FeaturedProjectWrapper>
  )
}

export default FeaturedProjectCard
