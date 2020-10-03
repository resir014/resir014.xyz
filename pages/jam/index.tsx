import Link from 'next/link'
import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import convert from 'htmr'

import { Stack } from '~/components/chungking-core'
import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader, PostMeta } from '~/modules/posts'
import { LiteYouTube, VideoCard } from '~/modules/video'
import { getAllPosts } from '~/lib/posts'
import { renderMarkdown } from '~/lib/markdown-to-html'
import htmrTransform from '~/lib/htmr-transform'
import { BaseJamProps } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'

export const getStaticProps = async () => {
  const allPosts: BaseJamProps[] = getAllPosts(
    ['category', 'title', 'slug', 'date', 'youtube_embed_id', 'featured', 'content'],
    'jam'
  ).map((post) => ({ ...post, content: renderMarkdown(post.content || '') }))

  return {
    props: { allPosts, siteMetadata }
  }
}

type JamIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const JamIndexPage: NextPage<JamIndexPageProps> = ({ allPosts }) => {
  return (
    <Page pageTitle="Posts">
      <Content>
        <PostHeader title="Jam" lead="What is @resir014 listening to right now?" />
        <PostBody>
          <Stack spacing="xxl">
            {allPosts.map((post) => (
              <VideoCard
                key={post.slug}
                metadata={<PostMeta category={post.category} date={post.date} />}
                title={
                  <Link href="/jam/[...slug]/" as={`/jam/${post.slug}/`} passHref>
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

export default JamIndexPage
