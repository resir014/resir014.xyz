import { InferGetStaticPropsType, NextPage } from 'next'
import Error from 'next/error'
import * as React from 'react'

import { Content, Page } from '~/components/layout'
import { YouTubePreconnect } from '~/components/perf'
import PostHeaderImage from '~/modules/posts/PostHeaderImage'
import { PostBody, PostHeader } from '~/modules/posts'
import { getPageBySlug } from '~/lib/pages'
import markdownToHtml from '~/lib/markdown-to-html'
import { BasePageProps } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'
import { HomepageHero, LiveBanner } from '~/modules/home'

export const getStaticProps = async () => {
  const live: BasePageProps = getPageBySlug('live', ['title', 'lead', 'header_image', 'slug', 'content'])
  const content = await markdownToHtml(live.content || '')

  return {
    props: { live: { ...live, content }, siteMetadata }
  }
}

type LivePageProps = InferGetStaticPropsType<typeof getStaticProps>

const LivePage: NextPage<LivePageProps> = ({ live }) => {
  if (live) {
    const { title, lead, header_image, content } = live
    return (
      <Page pageTitle={title}>
        <YouTubePreconnect />
        <HomepageHero>
          <LiveBanner />
        </HomepageHero>
        <Content>
          {header_image && <PostHeaderImage src={header_image} alt={title} />}
          <PostHeader title={title} lead={lead} />
          <PostBody content={content} />
        </Content>
      </Page>
    )
  }

  return <Error statusCode={404} />
}

export default LivePage
