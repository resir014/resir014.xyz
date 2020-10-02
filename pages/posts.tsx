import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'

import { Stack } from '~/components/chungking-core'
import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader, PostListItem } from '~/modules/posts'
import { getAllPosts } from '~/lib/posts'
import { PostMetadata } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'

export const getStaticProps = async () => {
  const allPosts: PostMetadata[] = getAllPosts(['category', 'title', 'lead', 'slug', 'date'], 'article')

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
