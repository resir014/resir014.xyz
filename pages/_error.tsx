import * as React from 'react'
import Link from 'next/link'
import { ErrorProps } from 'next/error'

import { Anchor, Paragraph } from '~/components/chungking-core'
import { Content, Page } from '~/components/layout'
import { PostBody, PostHeader } from '~/modules/posts'

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error'
}

const CustomErrorPage: React.FC<ErrorProps> = ({ statusCode, title }) => {
  const errorMessage = React.useMemo(() => title || statusCodes[statusCode] || 'Unknown error', [statusCode, title])

  return (
    <Page pageTitle={`${statusCode}: ${errorMessage}`}>
      <Content>
        <PostHeader title={`${statusCode}.`} />
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
}

export default CustomErrorPage
