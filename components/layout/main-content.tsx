import * as React from 'react';
import { NextSeo } from 'next-seo';

export interface MainContentProps {
  className?: string;
  style?: React.CSSProperties;
  pageTitle?: string;
}

export const MainContent: React.FC<MainContentProps> = ({ children, pageTitle }) => (
  <main className="block flex-auto relative">
    {pageTitle && <NextSeo title={pageTitle} openGraph={{ title: pageTitle }} />}
    {children}
  </main>
);
