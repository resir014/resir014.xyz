import * as React from 'react'
import Link from 'next/link'

import { Anchor, Paragraph } from '~/components/chungking-core'
import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader } from '~/modules/posts'

const NotFoundPage = () => (
  <Page pageTitle="404: Page not found.">
    <Content>
      <PostHeader title="404." />
      <PostBody>
        <Paragraph>
          You&apos;ve hit the void.{' '}
          <Link href="/" passHref>
            <Anchor>Go back home.</Anchor>
          </Link>
        </Paragraph>
      </PostBody>
    </Content>
  </Page>
)

export default NotFoundPage
