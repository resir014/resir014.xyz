import { InferGetStaticPropsType, NextPage } from 'next'
import * as React from 'react'
import { Content, Page } from '~/components/layout'
import { getAllPosts } from '~/lib/posts'
import { BookmarkList } from '~/modules/bookmarks'
import { Post, PostBody, PostHeader } from '~/modules/posts'
import { BaseBookmarkProps } from '~/types/posts'

export const getStaticProps = async () => {
  const bookmarks: BaseBookmarkProps[] = getAllPosts(['category', 'title', 'link', 'slug', 'date'], 'bookmark')

  return { props: { bookmarks } }
}

type BookmarksPageProps = InferGetStaticPropsType<typeof getStaticProps>

const BookmarksPage: NextPage<BookmarksPageProps> = ({ bookmarks }) => {
  return (
    <Page pageTitle="Bookmarks">
      <Content>
        <Post>
          <PostHeader title="Bookmarks" lead="@resir014's reading list." />
          <PostBody>
            <BookmarkList bookmarks={bookmarks} />
          </PostBody>
        </Post>
      </Content>
    </Page>
  )
}

export default BookmarksPage
