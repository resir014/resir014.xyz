import * as React from 'react';
import clsx from 'clsx';

import type { ProjectMetadata } from '~/types/projects';
import { ProjectItem } from './project-item';

export interface ProjectSectionProps extends React.ComponentPropsWithoutRef<'section'> {
  title?: string;
  projects: ProjectMetadata[];
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  className,
  style,
  title,
  projects,
  ...rest
}) => {
  if (projects.length !== 0) {
    return (
      <section className={clsx('space-y-9', className)} style={style} {...rest}>
        {title ? <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{title}</h2> : null}
        <div className="space-y-6">
          {projects.map(project => (
            <ProjectItem key={project.slug} project={project} />
          ))}
        </div>
      </section>
    );
  }

  return <p className="text-chungking-grey-500">No projects.</p>;
};
