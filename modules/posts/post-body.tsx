import * as React from 'react'
import CSS from 'csstype'
import convert from 'htmr'
import { Anchor, Box, MessageBox, Paragraph, Space } from '@resir014/chungking-react'

import { Container, ContainerSizes } from '~/components/layout'
import { SyndicationFormat } from '~/types/default'
import { LI, UL } from '../markdown'

interface PostBodyProps {
  content?: string
  containerSize?: ContainerSizes
  syndication?: SyndicationFormat[]
  spacing?: Space | CSS.Property.Margin
}

const PostBody: React.FC<PostBodyProps> = ({ content, syndication, containerSize = 'md', children }) => {
  const renderSyndication = () => {
    if (syndication) {
      return (
        <MessageBox mb="lg">
          <Paragraph mb="xs">This post is also published on:</Paragraph>
          <UL>
            {syndication.map((item) => (
              <LI>
                <Anchor href={item.url} target="_blank" className="u-syndication" rel="noopener noreferrer external syndication">
                  {item.name}
                </Anchor>
              </LI>
            ))}
          </UL>
        </MessageBox>
      )
    }

    return null
  }

  if (content) {
    return (
      <Box as="section" p="lg" pb={96}>
        <Container size={containerSize}>
          {renderSyndication()}
          <div className="e-content prose prose-base lg:prose-lg prose-invert">{convert(content)}</div>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="section" p="lg" pb={96}>
      <Container size={containerSize}>
        {renderSyndication()}
        <div className="e-content">{children}</div>
      </Container>
    </Box>
  )
}

export default PostBody
