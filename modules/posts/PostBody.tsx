import * as React from 'react'
import convert from 'htmr'
import { Anchor, Box, MessageBox, Paragraph, Space, Stack } from '@resir014/chungking-react'

import htmrTransform from '~/lib/htmr-transform'
import { Container, ContainerSizes } from '~/components/layout'
import { SyndicationFormat } from '~/types/default'
import { LI, UL } from '../markdown'

interface PostBodyProps {
  content?: string
  containerSize?: ContainerSizes
  syndication?: SyndicationFormat[]
  spacing?: Space | number
}

const PostBody: React.FC<PostBodyProps> = ({ content, syndication, containerSize = 'md', spacing = 'md', children }) => {
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
          <Stack spacing={spacing} className="e-content">
            {convert(content, { transform: htmrTransform })}
          </Stack>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="section" p="lg" pb={96}>
      <Container size={containerSize}>
        {renderSyndication()}
        <Stack spacing={spacing} className="e-content">
          {children}
        </Stack>
      </Container>
    </Box>
  )
}

export default PostBody
