import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'

import { Stack, Anchor, Text } from '~/components/chungking-core'
import { Container, Page } from '~/components/layout'
import { HomepageContent, HomepageSection, HomepageSectionTitle } from '~/modules/home'
import { FeaturedProjectCard } from '~/modules/projects'
import { FeaturedPhoto } from '~/modules/photos'
import { PostListItem } from '~/modules/posts'
import { renderFeaturedVideo } from '~/modules/video'

import { getFeaturedArticles, getFeaturedJam, getFeaturedPhoto, getFeaturedVideo } from '~/lib/posts'
import { getFeaturedProject } from '~/lib/projects'
import { BaseJamProps, BasePhotoProps, BasePostProps, BaseVideoProps, PostMetadata } from '~/types/posts'
import { ProjectMetadata } from '~/types/projects'

export const getStaticProps = async () => {
  const allPosts: BasePostProps[] = getFeaturedArticles()
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

  return {
    props: { allPosts: allPosts.slice(0, 3), recentJam, recentVideo, featuredPhoto, featuredProject }
  }
}

const LiveBanner = dynamic(() => import('~/modules/live/LiveBanner'))

type IndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const IndexPage: NextPage<IndexPageProps> = ({ allPosts, recentJam, recentVideo, featuredPhoto, featuredProject }) => (
  <Page>
    <NextSeo title="@resir014" titleTemplate="%s" openGraph={{ title: 'Home' }} />
    <LiveBanner />
    <HomepageContent>
      <Stack spacing={96}>
        <HomepageSection>
          <Container size="md">
            <Stack spacing="xxl">
              <HomepageSectionTitle>Featured articles</HomepageSectionTitle>
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
              <HomepageSectionTitle>Currently listening to</HomepageSectionTitle>
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
              <HomepageSectionTitle>Recently watched</HomepageSectionTitle>
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
              <HomepageSectionTitle>Featured photo</HomepageSectionTitle>
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
              <HomepageSectionTitle>Featured project</HomepageSectionTitle>
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
