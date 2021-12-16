import * as React from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Stack, Anchor, Text } from '@resir014/chungking-react';

import { Page } from '~/components/layout';
import {
  HomepageContent,
  HomepageHero,
  HomepageSection,
  HomepageSectionHeader,
} from '~/modules/home';
import { FeaturedProjectCard } from '~/modules/projects';
import { FeaturedPhoto } from '~/modules/photos';
import { PostListItem } from '~/modules/posts';
import { renderFeaturedVideo } from '~/modules/video';

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
  PostMetadata,
} from '~/types/posts';
import { ProjectMetadata } from '~/types/projects';
import { BookmarkList } from '~/modules/bookmarks';
import LiveStreamStatus from '~/modules/live/LiveStreamStatus';

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

const IndexPage: NextPage<IndexPageProps> = ({
  allPosts,
  featuredBookmarks,
  recentJam,
  recentVideo,
  featuredPhoto,
  featuredProject,
}) => (
  <Page>
    <NextSeo title="@resir014" titleTemplate="%s" openGraph={{ title: 'Home' }} />
    <HomepageHero />
    <HomepageContent>
      <Stack spacing="96px">
        <HomepageSection size="md">
          <Stack spacing="xxl">
            <HomepageSectionHeader
              title="Livestream"
              description="Video game and live coding streams on Twitch, three times a week."
            />
            <LiveStreamStatus />
          </Stack>
        </HomepageSection>
        <HomepageSection size="md">
          <Stack spacing="xxl">
            <HomepageSectionHeader
              title="Featured articles"
              description="Writings about web development, technology, and everything in between."
            />
            <Stack spacing="xxl">
              {allPosts.map((post: PostMetadata) => (
                <PostListItem key={post.slug} post={post} />
              ))}
            </Stack>
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
            <HomepageSectionHeader
              title="Current jam"
              description="What have I been listening to on repeat?"
            />
            {renderFeaturedVideo(recentJam, 'jam')}
            <Text display="block" variant="xl">
              <Link href="/jam" passHref>
                <Anchor>View all jams &rarr;</Anchor>
              </Link>
            </Text>
          </Stack>
        </HomepageSection>
        <HomepageSection size="md">
          <Stack spacing="xxl">
            <HomepageSectionHeader title="Recently watched" />
            {renderFeaturedVideo(recentVideo, 'videos')}
            <Text display="block" variant="xl">
              <Link href="/videos" passHref>
                <Anchor>View all videos &rarr;</Anchor>
              </Link>
            </Text>
          </Stack>
        </HomepageSection>
        <HomepageSection size="md">
          <Stack spacing="xxl">
            <HomepageSectionHeader
              title="Featured photo"
              description="Sometimes I go outside and take photos with my camera."
            />
            <FeaturedPhoto photo={featuredPhoto} />
            <Text display="block" variant="xl">
              <Link href="/photos" passHref>
                <Anchor>View all photos &rarr;</Anchor>
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
      </Stack>
    </HomepageContent>
  </Page>
);

export default IndexPage;
