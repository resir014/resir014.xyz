import * as React from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { Box } from '@resir014/chungking-react';

import { Masthead } from '../components/layout/masthead';
import Footer from '../components/layout/footer';
import siteMetadata from '~/lib/data/site-metadata';
import menuItems from '~/lib/data/menu-items';

interface DefaultLayoutProps {
  className?: string;
  style?: React.CSSProperties;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, className, style }) => {
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

export default DefaultLayout;
