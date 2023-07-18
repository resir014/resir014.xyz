import * as React from 'react';

export function TypographySpecimenContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="not-prose flex flex-col rounded-lg shadow-double overflow-hidden">
      {children}
    </div>
  );
}
