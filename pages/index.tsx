import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Stack, Anchor, Text } from '@resir014/chungking-react';

import {
  HomepageContent,
  HomepageHero,
  HomepageSection,
  HomepageSectionHeader,
} from '~/modules/home';
import { FeaturedProjectCard } from '~/modules/projects';
import { FeaturedPostList } from '~/modules/posts';

import {
  getFeaturedArticles,
  getFeaturedBookmarks,
  getFeaturedJam,
  getFeaturedPhoto,
  getFeaturedVideo,
} from '~/lib/posts';
import { getFeaturedProject } from '~/lib/projects';
import {
  BaseBookmarkProps,
  BaseJamProps,
  BasePhotoProps,
  BasePostProps,
  BaseVideoProps,
} from '~/types/posts';
import { ProjectMetadata } from '~/types/projects';
import { BookmarkList } from '~/modules/bookmarks';
import DefaultLayout from '~/layouts/default-layout';

export const getStaticProps = async () => {
  const allPosts: BasePostProps[] = getFeaturedArticles(3);
  const featuredBookmarks: BaseBookmarkProps[] = getFeaturedBookmarks();
  const recentJam: BaseJamProps = getFeaturedJam();
  const recentVideo: BaseVideoProps = getFeaturedVideo();
  const featuredPhoto: BasePhotoProps = getFeaturedPhoto();
  const featuredProject: ProjectMetadata = getFeaturedProject([
    'category',
    'title',
    'header_image',
    'description',
    'tags',
    'project_url',
    'slug',
  ]);

  return {
    props: { allPosts, featuredBookmarks, recentJam, recentVideo, featuredPhoto, featuredProject },
  };
};

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const IndexPage: NextPage<IndexPageProps> = ({ allPosts, featuredBookmarks, featuredProject }) => (
  <DefaultLayout>
    <NextSeo title="@resir014" titleTemplate="%s" openGraph={{ title: 'Home' }} />
    <HomepageHero />
    <HomepageContent>
      <div className="space-y-12">
        <HomepageSection size="md">
          <Stack spacing="xxl">
            <HomepageSectionHeader
              title="Featured articles"
              description="Writings about web development, technology, and everything in between."
            />
            <FeaturedPostList posts={allPosts} />
            <Text display="block" variant="xl">
              <Link href="/posts" passHref>
                <Anchor>View all posts &rarr;</Anchor>
              </Link>
            </Text>
          </Stack>
        </HomepageSection>
        <HomepageSection size="md">
          <Stack spacing="xxl">
            <HomepageSectionHeader title="Reading list" />
            <BookmarkList bookmarks={featuredBookmarks} />
            <Text display="block" variant="xl">
              <Link href="/bookmarks" passHref>
                <Anchor>View all bookmarks &rarr;</Anchor>
              </Link>
            </Text>
          </Stack>
        </HomepageSection>
        <HomepageSection size="md">
          <Stack spacing="xxl">
            <HomepageSectionHeader title="Featured project" />
            <FeaturedProjectCard project={featuredProject} />
            <Text display="block" variant="xl">
              <Link href="/projects" passHref>
                <Anchor>View all projects &rarr;</Anchor>
              </Link>
            </Text>
          </Stack>
        </HomepageSection>
      </div>
    </HomepageContent>
  </DefaultLayout>
);

export default IndexPage;
