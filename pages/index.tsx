import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'

import { Stack, Anchor, Text } from '~/components/chungking-core'
import { Container, Page } from '~/components/layout'
import { HomepageContent, HomepageSection, HomepageSectionHeader } from '~/modules/home'
import { FeaturedProjectCard } from '~/modules/projects'
import { FeaturedPhoto } from '~/modules/photos'
import { PostHCard, PostListItem } from '~/modules/posts'
import { renderFeaturedVideo } from '~/modules/video'

import { getFeaturedArticles, getFeaturedBookmarks, getFeaturedJam, getFeaturedPhoto, getFeaturedVideo } from '~/lib/posts'
import { getFeaturedProject } from '~/lib/projects'
import { BaseBookmarkProps, BaseJamProps, BasePhotoProps, BasePostProps, BaseVideoProps, PostMetadata } from '~/types/posts'
import { ProjectMetadata } from '~/types/projects'
import { BookmarkList } from '~/modules/bookmarks'
import { SiteAuthor } from '~/types/default'

import siteMetadata from '~/_data/siteMetadata.json'

export const getStaticProps = async () => {
  const allPosts: BasePostProps[] = getFeaturedArticles()
  const featuredBookmarks: BaseBookmarkProps[] = getFeaturedBookmarks()
  const recentJam: BaseJamProps = getFeaturedJam()
  const recentVideo: BaseVideoProps = getFeaturedVideo()
  const featuredPhoto: BasePhotoProps = getFeaturedPhoto()
  const featuredProject: ProjectMetadata = getFeaturedProject([
    'category',
    'title',
    'header_image',
    'description',
    'tags',
    'project_url',
    'slug'
  ])
  const { author } = siteMetadata

  return {
    props: { allPosts: allPosts.slice(0, 3), featuredBookmarks, recentJam, recentVideo, featuredPhoto, featuredProject, author }
  }
}

const LiveBanner = dynamic(() => import('~/modules/live/LiveBanner'))

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const IndexPage: NextPage<IndexPageProps> = ({
  allPosts,
  featuredBookmarks,
  recentJam,
  recentVideo,
  featuredPhoto,
  featuredProject,
  author
}) => (
  <Page>
    <NextSeo title="@resir014" titleTemplate="%s" openGraph={{ title: 'Home' }} />
    <LiveBanner />
    <HomepageContent>
      <Stack spacing={96}>
        <PostHCard hidden author={author} m={0} />
        <HomepageSection>
          <Container size="md">
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
              <Text variant={500}>
                <Link href="/posts" passHref>
                  <Anchor>View all posts &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionHeader title="Reading list" />
              <BookmarkList bookmarks={featuredBookmarks} />
              <Text variant={500}>
                <Link href="/bookmarks" passHref>
                  <Anchor>View all bookmarks &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionHeader title="Current jam" description="What have I been listening to on repeat?" />
              {renderFeaturedVideo(recentJam, 'jam')}
              <Text variant={500}>
                <Link href="/jam" passHref>
                  <Anchor>View all jams &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionHeader title="Recently watched" />
              {renderFeaturedVideo(recentVideo, 'videos')}
              <Text variant={500}>
                <Link href="/videos" passHref>
                  <Anchor>View all videos &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionHeader title="Featured photo" description="Sometimes I go outside and take photos with my camera." />
              <FeaturedPhoto photo={featuredPhoto} />
              <Text variant={500}>
                <Link href="/photos" passHref>
                  <Anchor>View all photos &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionHeader title="Featured project" />
              <FeaturedProjectCard project={featuredProject} />
              <Text variant={500}>
                <Link href="/projects" passHref>
                  <Anchor>View all projects &rarr;</Anchor>
                </Link>
              </Text>
            </Stack>
          </Container>
        </HomepageSection>
      </Stack>
    </HomepageContent>
  </Page>
)

export default IndexPage
