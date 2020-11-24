import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import { Stack } from '@resir014/chungking-core'

import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader, PostListItem } from '~/modules/posts'
import { getAllPosts } from '~/lib/posts'
import { PostMetadata } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'
import { generateRSS } from '~/lib/rss'

export const getStaticProps = async () => {
  const allPosts: PostMetadata[] = getAllPosts(['category', 'title', 'lead', 'slug', 'date'], 'article')
  const rss = generateRSS(allPosts)
  const fs = await import('fs')

  fs.mkdirSync('./public/posts', { recursive: true })
  fs.writeFileSync('./public/posts/rss.xml', rss)

  return {
    props: { allPosts, siteMetadata }
  }
}

type PostsIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const PostsIndexPage: NextPage<PostsIndexPageProps> = ({ allPosts }) => (
  <Page pageTitle="Posts">
    <Content>
      <PostHeader title="Posts" />
      <PostBody>
        <Stack spacing="xxl">
          {allPosts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </Stack>
      </PostBody>
    </Content>
  </Page>
)

export default PostsIndexPage
