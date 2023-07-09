import * as React from 'react';
import Image from 'next/image';
import { LogoCardContainer } from './logo-card-container';
import { LogoCard } from './logo-card';

export function LogoSpecs() {
  return (
    <>
      <h2>Logo</h2>
      <p>
        The resir014 logo is designed by Lvyathan. (
        <a href="https://twitter.com/Lvyathan" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>{' '}
        /{' '}
        <a href="https://www.behance.net/adlihussain" target="_blank" rel="noopener noreferrer">
          Behance
        </a>
        )
      </p>
      <h3>Icon + Wordmark</h3>
      <LogoCardContainer>
        <LogoCard mode="light">
          <Image
            src="/static/brand/logo-wordmark-lightmode.png"
            alt="resir014's logo and wordmark, in dark mode"
            width={233}
            height={72}
          />
        </LogoCard>
        <LogoCard mode="dark">
          <Image
            src="/static/brand/logo-wordmark-darkmode.png"
            alt="resir014's logo and wordmark, in dark mode"
            width={233}
            height={72}
          />
        </LogoCard>
      </LogoCardContainer>
      <h3>Icon</h3>
      <LogoCardContainer>
        <LogoCard mode="light">
          <Image
            src="/static/brand/logo-lightmode.png"
            alt="resir014's icon, in dark mode"
            width={36}
            height={63.5}
          />
        </LogoCard>
        <LogoCard mode="dark">
          <Image
            src="/static/brand/logo-darkmode.png"
            alt="resir014's icon, in dark mode"
            width={36}
            height={63.5}
          />
        </LogoCard>
      </LogoCardContainer>
      <p>
        <a>Download the logo pack here.</a>
      </p>
    </>
  );
}
