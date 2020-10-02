import * as React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Error from 'next/error'

import { getPostBySlug, getAllPosts } from '~/lib/posts'
import markdownToHtml from '~/lib/markdown-to-html'

import { Container, Content, Page } from '~/components/layout'
import { LiteYouTube, VideoCard } from '~/modules/video'
import { YouTubePreconnect } from '~/components/perf'
import { PostBody, PostHeader } from '~/modules/posts'
import { BaseVideoProps } from '~/types/posts'
import { SiteMetadata } from '~/types/default'

import siteMetadata from '~/_data/siteMetadata.json'

type VideoPostPageProps = {
  post?: BaseVideoProps
  siteMetadata: SiteMetadata
}

const VideoPostPage: NextPage<VideoPostPageProps> = ({ post }) => {
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

  return <Error statusCode={404} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (ctx.params && Array.isArray(ctx.params?.slug)) {
    const post = getPostBySlug(ctx.params.slug, ['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'], 'video')

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
  const posts = getAllPosts(['slug'], 'video')

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

export default VideoPostPage
