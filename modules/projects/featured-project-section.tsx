import * as React from 'react';
import clsx from 'clsx';

import { ProjectMetadata } from '~/types/projects';
import { FeaturedProjectCard } from './featured-project-card';

export interface FeaturedProjectSectionProps extends React.ComponentPropsWithoutRef<'section'> {
  title?: string;
  project?: ProjectMetadata;
}

export const FeaturedProjectSection: React.FC<FeaturedProjectSectionProps> = ({
  className,
  style,
  title,
  project,
  ...rest
}) => {
  if (project) {
    return (
      <section className={clsx('space-y-9', className)} style={style} {...rest}>
        {title ? <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{title}</h2> : null}
        <FeaturedProjectCard key={project.slug} project={project} />
      </section>
    );
  }

  return <p className="text-chungking-grey-500">No projects.</p>;
};
