/* eslint-disable react/no-danger */
import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Image from 'next/image';
import { ProjectMetadata } from '~/types/projects';
import { ProjectBadge } from './project-badge';

export interface ProjectFieldProps extends React.ComponentPropsWithoutRef<'article'> {
  project: ProjectMetadata;
}

export const ProjectItem: React.FC<ProjectFieldProps> = ({
  className,
  style,
  project,
  ...rest
}) => {
  const { header_image, title, description, tags, slug } = project;

  return (
    <article
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
          <div className="relative w-full h-[144px] overflow-hidden rounded-md shadow-lg">
            <Image loading="lazy" src={header_image} alt={title} layout="fill" objectFit="cover" />
          </div>
        ) : null}
        <div className="space-y-1">
          <h2 className="text-xl lg:text-2xl leading-tight lg:leading-tight font-semibold">
            <Link href="/projects/[slug]" as={`/projects/${slug}`} passHref>
              <a className="helper-link-cover hover:underline">{title}</a>
            </Link>
          </h2>
          <p className="text-base text-chungking-grey-200">{description ?? ''}</p>
        </div>
      </div>
    </article>
  );
};
