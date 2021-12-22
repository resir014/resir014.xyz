import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { ProjectBadge } from './project-badge';
import { ProjectMetadata } from '~/types/projects';

export interface FeaturedProjectCardProps extends React.ComponentPropsWithoutRef<'section'> {
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
      className={clsx('flex flex-col relative space-y-2', className)}
      style={style}
      {...rest}
    >
      {tags ? (
        <div className="space-x-4">
          {tags.map(tag => (
            <ProjectBadge key={tag} seed={`${slug} ${tag}`} tag={tag} />
          ))}
        </div>
      ) : null}
      <div className="space-y-4">
        {header_image && (
          <div className="relative w-full h-full aspect-video overflow-hidden rounded-md shadow-lg">
            <Image loading="lazy" src={header_image} alt={title} layout="fill" objectFit="cover" />
          </div>
        )}
        <div className="space-y-1">
          <h2 className="text-xl lg:text-2xl leading-tight lg:leading-tight font-semibold">
            <Link href="/projects/[slug]" as={`/projects/${slug}`} passHref>
              <a className="helper-link-cover hover:underline">{title}</a>
            </Link>
          </h2>
          <p className="text-base text-chungking-grey-200">{description}</p>
        </div>
      </div>
    </section>
  );
};
