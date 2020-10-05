import * as React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { getPostBySlug, getAllPosts } from '~/lib/posts'
import markdownToHtml from '~/lib/markdown-to-html'

import { Container, Content, Page } from '~/components/layout'
import { LiteYouTube, VideoCard } from '~/modules/video'
import { YouTubePreconnect } from '~/components/perf'
import { PostBody, PostHeader } from '~/modules/posts'
import CustomErrorPage from '~/pages/_error'
import { BaseJamProps } from '~/types/posts'
import { SiteMetadata } from '~/types/default'

import siteMetadata from '~/_data/siteMetadata.json'

type JamPostPageProps = {
  post?: BaseJamProps
  siteMetadata: SiteMetadata
}

const JamPostPage: NextPage<JamPostPageProps> = ({ post }) => {
  const { author } = siteMetadata
  if (post) {
    const { title, date, youtube_embed_id, category, content } = post
    return (
      <Page pageTitle={title}>
        <YouTubePreconnect />
        <Content>
          <PostHeader title={title} author={author} category={category} date={date} />
          <Container size="lg">
            <VideoCard embed={<LiteYouTube videoId={youtube_embed_id} />} />
          </Container>
          <PostBody content={content} />
        </Content>
      </Page>
    )
  }

  return <CustomErrorPage statusCode={404} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (ctx.params && Array.isArray(ctx.params?.slug)) {
    const post = getPostBySlug(ctx.params.slug, ['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'], 'jam')

    const content = await markdownToHtml(post.content || '')

    return {
      props: { siteMetadata, post: { ...post, content } }
    }
  }

  return {
    props: { siteMetadata }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'], 'jam')

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug.split('/').filter(Boolean)
        }
      }
    }),
    fallback: false
  }
}

export default JamPostPage
