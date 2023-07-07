import * as React from 'react';
import { NextSeo } from 'next-seo';

export interface MainContentProps {
  className?: string;
  style?: React.CSSProperties;
  pageTitle?: string;
  pageDescription?: string;
}

export function MainContent({
  children,
  pageTitle,
  pageDescription,
}: React.PropsWithChildren<MainContentProps>) {
  return (
    <main className="block flex-auto relative">
      {pageTitle ? (
        <NextSeo
          title={pageTitle}
          description={pageDescription}
          openGraph={{ title: pageTitle, description: pageDescription }}
        />
      ) : null}
      {children}
    </main>
  );
}
