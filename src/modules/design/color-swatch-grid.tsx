import * as React from 'react';
import { ColorSwatch, type ColorSwatchProps } from './color-swatch';

export interface ColorSwatchGridProps {
  swatches: ColorSwatchProps[];
}

/**
 * A grid of colour swatches. Hydrated as one island, so that the grid spacing applies to the
 * swatches themselves.
 */
export function ColorSwatchGrid({ swatches }: ColorSwatchGridProps) {
  return (
    <div className="not-prose space-y-4">
      {swatches.map(swatch => (
        <ColorSwatch key={swatch.title} {...swatch} />
      ))}
    </div>
  );
}
