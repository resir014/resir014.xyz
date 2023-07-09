import * as React from 'react';

export function LogoCardContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="not-prose flex flex-col lg:flex-row rounded-lg shadow-double overflow-hidden">
      {children}
    </div>
  );
}
