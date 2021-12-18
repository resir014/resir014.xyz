import * as React from 'react';
import { Box } from '@resir014/chungking-react';
import { NextSeo } from 'next-seo';

interface ContentProps {
  className?: string;
  style?: React.CSSProperties;
  pageTitle?: string;
}

const Content: React.FC<ContentProps> = ({ children, pageTitle }) => (
  <Box as="main" display="block" flex="1 1 auto" position="relative" p={0}>
    {pageTitle && <NextSeo title={pageTitle} openGraph={{ title: pageTitle }} />}
    {children}
  </Box>
);

export default Content;
