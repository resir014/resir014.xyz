import * as React from 'react';
import Head from 'next/head';

import { Masthead } from '../components/layout/navbar';
import siteMetadata from '~/lib/data/site-metadata';
import menuItems from '~/lib/data/menu-items';
import { Footer, LayoutRoot } from '~/components/layout';

interface DefaultLayoutProps {
  className?: string;
  style?: React.CSSProperties;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, className, style }) => {
  const { author } = siteMetadata;

  return (
    <LayoutRoot className={className} style={style}>
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
    </LayoutRoot>
  );
};

export default DefaultLayout;
