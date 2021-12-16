import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import { Stack } from '@resir014/chungking-react'

import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader, PostListItem } from '~/modules/posts'
import { getAllPosts, getFeaturedArticles } from '~/lib/posts'
import { BasePostProps, PostMetadata } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'
import { generateRSS } from '~/lib/rss'

export const getStaticProps = async () => {
  const featuredPosts: BasePostProps[] = getFeaturedArticles(3)
  const allPosts: PostMetadata[] = getAllPosts(['category', 'title', 'lead', 'slug', 'date'], 'article')
  const rss = generateRSS(allPosts)
  const fs = await import('fs')

  fs.mkdirSync('./public/posts', { recursive: true })
  fs.writeFileSync('./public/posts/rss.xml', rss)

  return {
    props: { allPosts, featuredPosts, siteMetadata }
  }
}

type PostsIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const PostsIndexPage: NextPage<PostsIndexPageProps> = ({ featuredPosts, allPosts }) => (
  <Page pageTitle="Posts">
    <Content>
      <PostHeader title="Posts" />
      <PostBody>
        <Stack mt="md" spacing="xxl">
          <Stack spacing="lg">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Featured Posts</h2>
            <Stack spacing="xl">
              {featuredPosts.map((post) => (
                <PostListItem key={post.slug} post={post} />
              ))}
            </Stack>
          </Stack>
          <Stack spacing="lg">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">All Posts</h2>
            <Stack spacing="xl">
              {allPosts.map((post) => (
                <PostListItem key={post.slug} post={post} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </PostBody>
    </Content>
  </Page>
)

export default PostsIndexPage
