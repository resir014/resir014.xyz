import * as React from 'react';
import { Box } from '@resir014/chungking-react';
import { NextSeo } from 'next-seo';

export interface PageProps {
  className?: string;
  style?: React.CSSProperties;
  pageTitle?: string;
}

export const Content: React.FC<PageProps> = ({ children, pageTitle }) => (
  <Box as="main" display="block" flex="1 1 auto" position="relative" p={0}>
    {pageTitle && <NextSeo title={pageTitle} openGraph={{ title: pageTitle }} />}
    {children}
  </Box>
);
