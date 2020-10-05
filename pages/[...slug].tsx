import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import dynamic from 'next/dynamic'
import * as React from 'react'

import { Content, Page } from '~/components/layout'
import { YouTubePreconnect } from '~/components/perf'
import { PostBody, PostHeader, PostHeaderImage } from '~/modules/posts'
import CustomErrorPage from '~/pages/_error'
import { getAllPages, getPageBySlug } from '~/lib/pages'
import markdownToHtml from '~/lib/markdown-to-html'
import { BasePageProps } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (params?.slug && Array.isArray(params.slug)) {
    const page: BasePageProps = getPageBySlug(params.slug.join('/'), ['layout', 'title', 'lead', 'header_image', 'slug', 'content'])
    const content = await markdownToHtml(page.content || '')

    return {
      props: { page: { ...page, content }, siteMetadata }
    }
  }

  return { props: { siteMetadata } }
}

const LiveBanner = dynamic(() => import('~/modules/live/LiveBanner'))

type MarkdownPageProps = InferGetStaticPropsType<typeof getStaticProps>

const MarkdownPage: NextPage<MarkdownPageProps> = ({ page }) => {
  if (page) {
    const { layout, title, lead, header_image, content } = page
    return (
      <Page pageTitle={title}>
        <YouTubePreconnect />
        {layout === 'live' && <LiveBanner />}
        <Content>
          {header_image && <PostHeaderImage src={header_image} alt={title} />}
          <PostHeader title={title} lead={lead} />
          <PostBody content={content} />
        </Content>
      </Page>
    )
  }

  return <CustomErrorPage statusCode={404} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPages(['slug'])
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug.split('/').filter(Boolean)
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export default MarkdownPage
