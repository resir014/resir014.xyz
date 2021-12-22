import * as React from 'react';
import { PageBody, PageBodyProps } from '~/components/page';

export type ProjectBodyProps = PageBodyProps;

export const ProjectBody: React.FC<ProjectBodyProps> = ({ ...props }) => {
  return <PageBody {...props} />;
};
