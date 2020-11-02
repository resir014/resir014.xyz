import * as React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'

import { getPostBySlug, getAllPosts } from '~/lib/posts'
import markdownToHtml from '~/lib/markdown-to-html'

import { Content, Page } from '~/components/layout'
import { YouTubePreconnect } from '~/components/perf'
import { Post, PostBody, PostHeader } from '~/modules/posts'
import CustomErrorPage from '~/pages/_error'
import { BasePostProps } from '~/types/posts'
import { SiteMetadata } from '~/types/default'

import siteMetadata from '~/_data/siteMetadata.json'

type NotePostPageProps = {
  post?: BasePostProps
  siteMetadata: SiteMetadata
}

const NotePostPage: NextPage<NotePostPageProps> = ({ post }) => {
  const { author } = siteMetadata
  if (post) {
    const { title, category, date, header_image, content } = post
    return (
      <Page pageTitle={title}>
        <NextSeo
          openGraph={{
            type: 'article',
            title: 'Note posted by @resir014',
            article: {
              authors: [siteMetadata.author.name],
              publishedTime: date,
              section: category
            },
            images: [
              {
                url: `${siteMetadata.siteUrl}${header_image}`,
                width: 1200,
                height: 630,
                alt: title
              }
            ]
          }}
        />
        <YouTubePreconnect />
        <Content>
          <Post>
            <PostHeader title={title} author={author} category={category} date={date} />
            <PostBody content={content} />
          </Post>
        </Content>
      </Page>
    )
  }

  return <CustomErrorPage statusCode={404} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (ctx.params && Array.isArray(ctx.params?.slug)) {
    const post = getPostBySlug(ctx.params.slug, ['category', 'title', 'lead', 'date', 'header_image', 'slug', 'content'], 'note')

    const content = await markdownToHtml(post.content || '')

    return {
      props: { siteMetadata, post: { ...post, content } }
    }
  }

  return {
    props: { siteMetadata }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'], 'note')

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug.split('/').filter(Boolean)
        }
      }
    }),
    fallback: false
  }
}

export default NotePostPage
