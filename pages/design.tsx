import { NextPage } from 'next'
import * as React from 'react'
import { Content, Page } from '~/components/layout'
import ColorSpecs from '~/modules/design/ColorSpecs'
import { PostBody, PostHeader } from '~/modules/posts'

const DesignPage: NextPage = () => {
  return (
    <Page>
      <Content>
        <PostHeader title="Chungking Design System" />
        <PostBody>
          <ColorSpecs />
        </PostBody>
      </Content>
    </Page>
  )
}

export default DesignPage
