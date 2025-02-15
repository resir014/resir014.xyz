import * as React from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import clsx from 'clsx';
import type { BaseProjectProps } from '~/types/projects';
import { ProjectBadge } from './project-badge';

export interface FeaturedProjectCardProps extends React.ComponentPropsWithoutRef<'section'> {
  className?: string;
  style?: React.CSSProperties;
  project: BaseProjectProps;
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
        {header_image ? (
          <div className="relative w-full h-full aspect-video overflow-hidden rounded-md shadow-lg">
            <Image loading="lazy" src={header_image} alt={title} layout="fill" objectFit="cover" />
          </div>
        ) : null}
        <div className="space-y-1">
          <h2 className="text-xl lg:text-2xl leading-tight lg:leading-tight font-semibold">
            <Link
              href="/projects/[slug]"
              as={`/projects/${slug}`}
              className="helper-link-cover hover:underline"
            >
              {title}
            </Link>
          </h2>
          <p className="text-base text-chungking-grey-200">{description}</p>
        </div>
      </div>
    </section>
  );
};
