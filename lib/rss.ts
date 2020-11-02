import { PostMetadata } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'

const wrapWithCData = (text?: string): string => `<![CDATA[${text}]]>`

export const generateRSSItem = (post: PostMetadata): string => `
  <item>
    <guid isPermalink="true">https://resir014.xyz/posts/${post.slug}/</guid>
    <title>${wrapWithCData(post.title)}</title>
    <link>https://resir014.xyz/posts/${post.slug}/</link>
    <description>${wrapWithCData(post.lead)}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>
`

export const generateRSS = (posts: PostMetadata[]): string => `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${wrapWithCData(`Posts · ${siteMetadata.title}`)}</title>
    <link>https://resir014.xyz/posts/</link>
    <description>${wrapWithCData(siteMetadata.description)}</description>
    <generator>Next.js</generator>
    <language>${wrapWithCData('en')}</language>
    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
    <atom:link href="https://resir014.xyz/posts/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(generateRSSItem).join('')}
  </channel>
</rss>
`
