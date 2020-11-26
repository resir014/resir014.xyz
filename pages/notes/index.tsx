import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'

import { Stack } from '@resir014/chungking-react'
import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader } from '~/modules/posts'
import { NoteListItem } from '~/modules/notes'
import { getAllPosts } from '~/lib/posts'
import { renderMarkdown } from '~/lib/markdown-to-html'
import { BasePostProps } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'

export const getStaticProps = async () => {
  const allPosts: BasePostProps[] = getAllPosts(['category', 'title', 'lead', 'slug', 'date', 'content'], 'note')

  return {
    props: { allPosts: allPosts.map((post) => ({ ...post, content: renderMarkdown(post.content || '') })), siteMetadata }
  }
}

type NotesIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const NotesIndexPage: NextPage<NotesIndexPageProps> = ({ allPosts }) => (
  <Page pageTitle="Notes">
    <Content>
      <PostHeader title="Notes" />
      <PostBody>
        <Stack spacing="xxl" mt="lg">
          {allPosts.map((post) => (
            <NoteListItem key={post.slug} post={post} />
          ))}
        </Stack>
      </PostBody>
    </Content>
  </Page>
)

export default NotesIndexPage
