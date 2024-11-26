import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { MainContent } from '~/components/layout';
import DefaultLayout from '~/layouts/default-layout';
import { getAllPosts } from '~/lib/posts';
import { BookmarkList } from '~/modules/bookmarks';
import { Post, PostBody, PostHeader } from '~/modules/posts';
import type { NextPage } from '~/types/next';
import type { BaseBookmarkProps } from '~/types/posts';

export const getStaticProps = async () => {
  const bookmarks: BaseBookmarkProps[] = await getAllPosts(
    ['category', 'title', 'link', 'slug', 'date'],
    'bookmark'
  );

  return { props: { bookmarks } };
};

type BookmarksPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BookmarksPage: NextPage<BookmarksPageProps> = ({ bookmarks }) => {
  return (
    <MainContent pageTitle="Bookmarks" pageDescription="@resir014's reading list.">
      <Post>
        <PostHeader title="Bookmarks" lead="@resir014's reading list." />
        <PostBody>
          <BookmarkList bookmarks={bookmarks} />
        </PostBody>
      </Post>
    </MainContent>
  );
};

BookmarksPage.layout = page => <DefaultLayout>{page}</DefaultLayout>;

export default BookmarksPage;
