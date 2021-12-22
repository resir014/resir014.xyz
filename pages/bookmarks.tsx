import { InferGetStaticPropsType, NextPage } from 'next';
import * as React from 'react';
import { MainContent } from '~/components/layout';
import DefaultLayout from '~/layouts/default-layout';
import { getAllPosts } from '~/lib/posts';
import { BookmarkList } from '~/modules/bookmarks';
import { Post, PostBody, PostHeader } from '~/modules/posts';
import { BaseBookmarkProps } from '~/types/posts';

export const getStaticProps = async () => {
  const bookmarks: BaseBookmarkProps[] = getAllPosts(
    ['category', 'title', 'link', 'slug', 'date'],
    'bookmark'
  );

  return { props: { bookmarks } };
};

type BookmarksPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BookmarksPage: NextPage<BookmarksPageProps> = ({ bookmarks }) => {
  return (
    <DefaultLayout>
      <MainContent pageTitle="Bookmarks">
        <Post>
          <PostHeader title="Bookmarks" lead="@resir014's reading list." />
          <PostBody>
            <BookmarkList bookmarks={bookmarks} />
          </PostBody>
        </Post>
      </MainContent>
    </DefaultLayout>
  );
};

export default BookmarksPage;
