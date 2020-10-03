import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import convert from 'htmr'

import { Stack } from '~/components/chungking-core'
import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader, PostMeta } from '~/modules/posts'
import { LiteYouTube, VideoCard } from '~/modules/video'
import { getAllPosts } from '~/lib/posts'
import { renderMarkdown } from '~/lib/markdown-to-html'
import htmrTransform from '~/lib/htmr-transform'
import { BaseVideoProps } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'

export const getStaticProps = async () => {
  const allPosts: BaseVideoProps[] = getAllPosts(
    ['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'],
    'video'
  ).map((post) => ({ ...post, content: renderMarkdown(post.content || '') }))

  return {
    props: { allPosts, siteMetadata }
  }
}

type VideosIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const VideosIndexPage: NextPage<VideosIndexPageProps> = ({ allPosts }) => {
  return (
    <Page pageTitle="Posts">
      <Content>
        <PostHeader title="Videos" lead="What is @resir014 watching right now?" />
        <PostBody>
          <Stack spacing="xxl">
            {allPosts.map((post) => (
              <VideoCard
                key={post.slug}
                metadata={<PostMeta category={post.category} date={post.date} />}
                title={
                  <Link href="/videos/[...slug]/" as={`/videos/${post.slug}/`} passHref>
                    <a>{post.title}</a>
                  </Link>
                }
                embed={<LiteYouTube videoId={post.youtube_embed_id} />}
              >
                {convert(post.content, { transform: htmrTransform })}
              </VideoCard>
            ))}
          </Stack>
        </PostBody>
      </Content>
    </Page>
  )
}

export default VideosIndexPage
