import * as React from 'react';
import { TypographySpecimenContainer } from './typography-specimen-container';
import { TypographySpecimen } from './typography-specimen';

export function TypographySpecs() {
  return (
    <>
      <h2>Typography</h2>
      <h3>Inter</h3>
      <p>Used in all design elements.</p>
      <TypographySpecimenContainer>
        <TypographySpecimen mode="light" />
        <TypographySpecimen mode="dark" />
      </TypographySpecimenContainer>
      <p>
        <a href="https://rsms.me/inter/" target="_blank" rel="noopener noreferrer">
          Download the Inter typeface here.
        </a>
      </p>
      <h3>JetBrains Mono</h3>
      <p>Used in elements where monospace text is required.</p>
      <TypographySpecimenContainer>
        <TypographySpecimen mode="light" family="mono" />
        <TypographySpecimen mode="dark" family="mono" />
      </TypographySpecimenContainer>
      <p>
        <a href="https://www.jetbrains.com/lp/mono/" target="_blank" rel="noopener noreferrer">
          Download the JetBrains Mono typeface here.
        </a>
      </p>
    </>
  );
}
