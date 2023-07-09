import * as React from 'react';

export function ColorSwatchGrid({ children }: React.PropsWithChildren) {
  return <div className="not-prose space-y-4">{children}</div>;
}
