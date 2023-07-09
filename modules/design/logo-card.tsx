import clsx from 'clsx';
import * as React from 'react';

export interface LogoCardProps {
  mode?: 'light' | 'dark';
}

export function LogoCard({ mode = 'dark', children }: React.PropsWithChildren<LogoCardProps>) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center flex-1 py-9',
        mode === 'light' ? 'bg-chungking-white' : 'bg-chungking-black'
      )}
    >
      {children}
    </div>
  );
}
