import * as React from 'react';
import { Badge, BadgeProps } from '~/components/ui';

export interface ProjectBadgeProps extends Omit<BadgeProps, 'children' | 'size' | 'variant'> {
  tag: string;
  seed?: string;
}

export const ProjectBadge = React.forwardRef<HTMLSpanElement, ProjectBadgeProps>(
  ({ tag, seed, colorScheme = 'blue', ...rest }, ref) => {
    return (
      <Badge ref={ref} size="lg" variant="minimal" colorScheme={colorScheme} {...rest}>
        {tag}
      </Badge>
    );
  }
);

ProjectBadge.displayName = 'ProjectBadge';
