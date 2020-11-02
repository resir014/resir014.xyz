import * as React from 'react'
import Head from 'next/head'

const YouTubePreconnect: React.FC = () => {
  return (
    <Head>
      {/* The iframe document and most of its subresources come right off youtube.com */}
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />

      {/* The botguard script is fetched off from google.com */}
      <link rel="preconnect" href="https://www.google.com" />

      {/* Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling. */}
      <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
      <link rel="preconnect" href="https://static.doubleclick.net" />
    </Head>
  )
}

export default YouTubePreconnect
