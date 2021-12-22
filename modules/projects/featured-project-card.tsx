import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { Box, BoxProps } from '@resir014/chungking-react';
import { MarkdownParagraph } from '~/modules/markdown';

import { ProjectMetadata } from '~/types/projects';
import { Badge } from '~/components/ui';

export interface FeaturedProjectCardProps extends BoxProps {
  className?: string;
  style?: React.CSSProperties;
  project: ProjectMetadata;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  className,
  style,
  project,
  ...rest
}) => {
  const { header_image, title, description, tags, slug } = project;
  return (
    <section
      className={clsx('flex flex-col relative space-y-3', className)}
      style={style}
      {...rest}
    >
      {tags ? (
        <div className="space-x-4">
          {tags.map(tag => (
            <Badge key={tag} size="lg" variant="minimal" colorScheme="blue">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
      {header_image && (
        <div className="relative w-full h-full aspect-video overflow-hidden rounded-md shadow-lg">
          <Image loading="lazy" src={header_image} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="relative space-y-0.5">
        <h2 className="text-xl lg:text-2xl font-semibold">
          <Link href="/projects/[slug]" as={`/projects/${slug}`} passHref>
            <a className="helper-link-cover hover:underline">{title}</a>
          </Link>
        </h2>
        <Box flex="1">
          <MarkdownParagraph m={0}>{description}</MarkdownParagraph>
        </Box>
      </div>
    </section>
  );
};
