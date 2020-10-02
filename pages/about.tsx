import { InferGetStaticPropsType, NextPage } from 'next'
import Error from 'next/error'
import * as React from 'react'

import { Content, Page } from '~/components/layout'
import { YouTubePreconnect } from '~/components/perf'
import PostHeaderImage from '~/modules/posts/PostHeaderImage'
import { PostBody, PostHeader } from '~/modules/posts'
import { getPageBySlug } from '~/lib/pages'
import markdownToHtml from '~/lib/markdown-to-html'
import { BasePageProps } from '~/types/posts'

import siteMetadata from '~/_data/siteMetadata.json'

export const getStaticProps = async () => {
  const about: BasePageProps = getPageBySlug('about', ['title', 'lead', 'header_image', 'slug', 'content'])
  const content = await markdownToHtml(about.content || '')

  return {
    props: { about: { ...about, content }, siteMetadata }
  }
}

type AboutPageProps = InferGetStaticPropsType<typeof getStaticProps>

const AboutPage: NextPage<AboutPageProps> = ({ about }) => {
  if (about) {
    const { title, lead, header_image, content } = about
    return (
      <Page pageTitle={title}>
        <YouTubePreconnect />
        <Content>
          {header_image && <PostHeaderImage src={header_image} alt={title} />}
          <PostHeader title={title} lead={lead} />
          <PostBody content={content} />
        </Content>
      </Page>
    )
  }

  return <Error statusCode={404} />
}

export default AboutPage
