import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import Url from 'url-parse'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { Text, Heading, colors, shadows, UnstyledAnchor } from '../chungking-core'

interface BookmarkLinkProps {
  link?: string
  title: string
}

const StyledOutboundLink = styled(UnstyledAnchor)``.withComponent(OutboundLink)

const Root = styled(StyledOutboundLink)`
  display: block;
  background-color: ${colors.ultramarine30};
  background-image: linear-gradient(to right, ${colors.ultramarine30}, ${colors.blue30});
  color: ${colors.white};
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${shadows.single};

  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: ${shadows.double};
    border-radius: 6px;

    > h3 span {
      text-decoration: underline;
    }
  }
`

const BookmarkLink: React.FC<BookmarkLinkProps> = ({ link, title, ...rest }) => {
  const url = link ? new Url(link) : undefined

  return url ? (
    <Root
      className="u-bookmark-of h-cite p-name"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      <Heading as="h3" variant={700} m={0} color="green30" p="md">
        <span className="p-name">{title}</span> &raquo;
      </Heading>{' '}
      <Text
        display="block"
        m={0}
        px="md"
        py="xs"
        backgroundColor={transparentize(0.3, colors.black)}
        className="p-publication"
      >
        {url.host}
      </Text>
    </Root>
  ) : null
}

export default BookmarkLink
