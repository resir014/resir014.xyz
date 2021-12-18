import * as React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import clsx from 'clsx';
import { Box } from '@resir014/chungking-react';

import { Masthead } from './masthead';
import Footer from './Footer';
import siteMetadata from '~/lib/data/site-metadata';
import menuItems from '~/lib/data/menu-items';

interface LayoutRootProps {
  className?: string;
  style?: React.CSSProperties;
  pageTitle?: string;
}

const Page: React.FC<LayoutRootProps> = ({ children, className, style, pageTitle }) => {
  const { author } = siteMetadata;

  return (
    <Box
      className={clsx('bg-chungking-grey-900 text-chungking-white', className)}
      style={style}
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      minHeight="100vh"
      position="relative"
      padding={0}
    >
      {pageTitle && <NextSeo title={pageTitle} openGraph={{ title: pageTitle }} />}
      <Head>
        <meta name="twitter:dnt" content="on" />
        {Object.keys(author.url).map(key => (
          <link key={key} rel="me" href={author.url[key]} />
        ))}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="All posts by @resir014"
          href="/posts/rss.xml"
        />
        {process.env.NODE_ENV === 'production' && (
          <meta name="monetization" content={process.env.NEXT_PUBLIC_ILP_URL} />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
      </Head>
      <Masthead title="@resir014" items={menuItems} />
      {children}
      <Footer />
    </Box>
  );
};

export default Page;
