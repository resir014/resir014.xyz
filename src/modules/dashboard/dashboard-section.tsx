import clsx from 'clsx';
import * as React from 'react';

export interface DashboardSectionProps extends React.ComponentPropsWithoutRef<'section'> {
  title: string;
}

export const DashboardSection = React.forwardRef<HTMLDivElement, DashboardSectionProps>(
  ({ className, style, children, title, ...rest }, ref) => {
    return (
      <section ref={ref} className={clsx('space-y-9', className)} style={style} {...rest}>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{title}</h2>
        {children}
      </section>
    );
  }
);

DashboardSection.displayName = 'DashboardSection';
