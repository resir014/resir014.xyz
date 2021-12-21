import { css } from '@emotion/react';
import convert from 'htmr';
import Image from 'next/image';
import * as React from 'react';
import { Heading, Text, Badge, Box, BoxProps, Anchor } from '@resir014/chungking-react';
import ProjectTags from './ProjectTags';
import htmrTransform from '~/lib/htmr-transform';
import { ProjectMetadata } from '~/types/projects';

interface ProjectCardProps extends BoxProps {
  project: ProjectMetadata;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, ...rest }) => {
  const { category, header_image, title, description, tags, project_url } = project;
  return (
    <Box
      as="section"
      p={0}
      backgroundColor="ultramarine.500"
      borderRadius={8}
      overflow="hidden"
      boxShadow="single"
      {...rest}
    >
      {header_image && (
        <Image
          loading="lazy"
          src={header_image}
          alt={title}
          width={1140}
          height={580}
          unoptimized
          css={css`
            object-fit: cover;
          `}
        />
      )}
      <Box p="lg">
        <Text
          variant="sm"
          letterSpacing="0.01em"
          fontWeight={300}
          fontFamily="monospace"
          color="white"
          css={css`
            text-transform: uppercase;
          `}
        >
          Projects / {category}
        </Text>
        <Heading as="h1" variant="4xl" mt="xxs" mb="sm" color="turquoise.400" className="p-name">
          {title}
        </Heading>
        {description ? (
          <p className="p-summary font-light text-xl">
            {convert(description, { transform: htmrTransform })}
          </p>
        ) : null}
        {tags ? (
          <ProjectTags>
            {tags.map(tag => (
              <Badge key={tag} className="p-category">
                {tag}
              </Badge>
            ))}
          </ProjectTags>
        ) : null}
        {project_url && (
          <Box mt="lg">
            <Anchor href={project_url} target="_blank" rel="noopener noreferrer" variant="xl">
              Go to project &rarr;
            </Anchor>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProjectCard;
