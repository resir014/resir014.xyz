import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import Url from 'url-parse'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { Text, Heading, colors, space, shadows } from '../chungking-core'

interface BookmarkLinkProps {
  link?: string
  title: string
}

const BookmarkLink: React.SFC<BookmarkLinkProps> = ({ link, title }) => {
  const url = link ? new Url(link) : undefined

  return url ? (
    <Root
      className="u-bookmark-of h-cite p-name"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Heading as="h3" scale="paragon" m={0} p="md">
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

const Root = styled(OutboundLink)`
  display: block;
  margin-top: ${space.sm}px;
  margin-bottom: ${space.md}px;
  background: linear-gradient(to right, ${colors.blue30}, ${colors.green30});
  color: ${colors.white};
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${shadows.single};

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: ${shadows.double};

    > h3 span {
      text-decoration: underline;
    }
  }
`
