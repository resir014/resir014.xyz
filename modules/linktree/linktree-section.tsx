import * as React from 'react';
import clsx from 'clsx';
import { LinktreeCard } from '.';
import { LinktreeItem } from '~/lib/data/linktree';

export interface LinktreeSectionProps {
  className?: string;
  style?: React.CSSProperties;
  category: string;
  items: LinktreeItem[];
}

export function LinktreeSection({ className, style, category, items }: LinktreeSectionProps) {
  return (
    <div className={clsx('space-y-9', className)} style={style}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{category}</h2>
      <ul className="space-y-4 list-none">
        {items.map(item => (
          <LinktreeCard key={item.url} item={item} />
        ))}
      </ul>
    </div>
  );
}
