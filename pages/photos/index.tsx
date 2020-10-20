import * as React from 'react'
import { NextPage, InferGetStaticPropsType } from 'next'

import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader } from '~/modules/posts'
import { getAllPosts } from '~/lib/posts'
import { renderMarkdown } from '~/lib/markdown-to-html'
import { BasePhotoProps } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'
import { Stack } from '~/components/chungking-core'
import PhotoListItem from '~/modules/photos/PhotoListItem'

export const getStaticProps = async () => {
  const allPosts: BasePhotoProps[] = getAllPosts(
    ['category', 'title', 'slug', 'date', 'header_image', 'featured', 'content'],
    'photo'
  ).map((post) => ({ ...post, content: renderMarkdown(post.content || '') }))

  return {
    props: { allPosts, siteMetadata }
  }
}

type PhotosIndexPageProps = InferGetStaticPropsType<typeof getStaticProps>

const PhotosIndexPage: NextPage<PhotosIndexPageProps> = ({ allPosts }) => {
  return (
    <Page pageTitle="Photos">
      <Content>
        <PostHeader title="Photos" lead="Recent photos taken by @resir014." />
        <PostBody>
          <Stack spacing={64} mt="lg">
            {allPosts.map((photo) => (
              <PhotoListItem key={photo.slug} photo={photo} />
            ))}
          </Stack>
        </PostBody>
      </Content>
    </Page>
  )
}

export default PhotosIndexPage
