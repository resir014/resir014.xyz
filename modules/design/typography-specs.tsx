import * as React from 'react';
import { TypographySpecimenContainer } from './typography-specimen-container';
import { TypographySpecimen } from './typography-specimen';

export function TypographySpecs() {
  return (
    <>
      <h2>Typography</h2>
      <h3>Inter</h3>
      <p>Used in all branding elements.</p>
      <TypographySpecimenContainer>
        <TypographySpecimen mode="light" />
        <TypographySpecimen mode="dark" />
      </TypographySpecimenContainer>
      <h3>JetBrains Mono</h3>
      <p>Used in elements where monospace text is required.</p>
      <TypographySpecimenContainer>
        <TypographySpecimen mode="light" family="mono" />
        <TypographySpecimen mode="dark" family="mono" />
      </TypographySpecimenContainer>
    </>
  );
}
