import * as React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { ProjectMetadata } from '~/types/projects';
import { Container } from '~/components/layout';
import { PageMetaItem } from '~/components/page';

export interface ProjectHeaderProps extends React.ComponentPropsWithoutRef<'header'> {
  project: ProjectMetadata;
}

export const ProjectHeader = React.forwardRef<HTMLDivElement, ProjectHeaderProps>(
  ({ className, style, project, ...rest }, ref) => {
    const { header_image, title, description, tags, project_url } = project;

    return (
      <header ref={ref} className={clsx('px-4 lg:px-6 pt-12', className)} style={style} {...rest}>
        <Container className="space-y-12">
          {header_image && (
            <div className="relative w-full h-full aspect-video overflow-hidden rounded-md shadow-lg">
              <Image
                loading="lazy"
                src={header_image}
                alt={title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div className="space-y-4">
            {tags ? (
              <div className="space-x-4">
                {tags.map(tag => (
                  <PageMetaItem key={tag}>{tag}</PageMetaItem>
                ))}
              </div>
            ) : null}
            <div className="relative space-y-4">
              {project_url ? (
                <h1 className="p-name text-3xl sm:text-4xl lg:text-5xl font-semibold">
                  <a
                    className="group helper-link-cover"
                    href={project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="group-hover:underline">{title}</span> &rarr;
                  </a>
                </h1>
              ) : (
                <h1 className="p-name text-3xl sm:text-4xl lg:text-5xl font-semibold">{title}</h1>
              )}
              <p className="p-summary text-lg sm:text-xl lg:text-2xl font-light">{description}</p>
            </div>
          </div>
        </Container>
      </header>
    );
  }
);

ProjectHeader.displayName = 'ProjectHeader';

export default ProjectHeader;
