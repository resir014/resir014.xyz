import * as React from 'react'
import Head from 'next/head'

import menuItems from '~/_data/menuItems.json'
import siteMetadata from '~/_data/siteMetadata.json'

import { Box } from '../chungking-core'
import { Masthead } from './Masthead'
import Footer from './Footer'
import { SiteMetadata } from '~/types/default'

interface PageProps {
  className?: string
  style?: React.CSSProperties
  pageTitle?: string
}

const Page: React.SFC<PageProps> = ({ children, className, style, pageTitle }) => {
  const { title, description, author }: SiteMetadata = siteMetadata

  return (
    <Box
      className={className}
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
        <title>{pageTitle ? `${pageTitle} · ${siteMetadata.title}` : '@resir014'}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta name="twitter:dnt" content="on" />
        {Object.keys(author.url).map((key) => (
          <link key={key} rel="me" href={author.url[key]} />
        ))}
        <link rel="alternate" type="application/rss+xml" title="All posts by @resir014" href="/posts/rss.xml" />
        {process.env.NODE_ENV === 'production' && <meta name="monetization" content={process.env.NEXT_PUBLIC_ILP_URL} />}
      </Head>
      <Masthead title="@resir014" items={menuItems} />
      {children}
      <Footer />
    </Box>
  )
}

export default Page
