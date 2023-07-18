import clsx from 'clsx';
import * as React from 'react';

export interface TypographySpecimenProps {
  mode?: 'light' | 'dark';
  family?: 'brand' | 'mono';
}

export function TypographySpecimen({ mode = 'dark', family = 'brand' }: TypographySpecimenProps) {
  return (
    <div
      className={clsx(
        'flex p-6',
        mode === 'light'
          ? 'bg-chungking-white text-chungking-black'
          : 'bg-chungking-black text-chungking-white',
        family === 'mono' ? 'font-mono' : 'font-sans'
      )}
    >
      <p className="text-2xl lg:text-3xl font-semibold">
        Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
    </div>
  );
}
