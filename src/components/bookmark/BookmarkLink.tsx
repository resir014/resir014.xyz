import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import Url from 'url-parse'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { colors } from '../../styles/variables'

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
      <LinkHeader>
        <LinkTitle className="p-name">{title}</LinkTitle> &raquo;
      </LinkHeader>{' '}
      <LinkSource className="p-publication">{url.host}</LinkSource>
    </Root>
  ) : null
}

export default BookmarkLink

const BookmarkTitle = styled('h3')`
  margin: 0;
`

const LinkHeader = styled(BookmarkTitle)`
  padding: 1rem;
  margin: 0;
  color: ${colors.white};
`

const LinkTitle = styled('span')``

const LinkSource = styled('span')`
  display: block;
  padding: 0.5rem 1rem;
  background-color: ${transparentize(0.3, colors.black)};
  user-select: none;
`

const Root = styled(OutboundLink)`
  display: block;
  background: linear-gradient(to right, ${colors.blue30}, ${colors.green30});
  color: ${colors.white};
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px 0px;

  &:first-of-type {
    margin-bottom: 1.5rem;
  }

  &:last-of-type {
    margin-top: 1rem;
  }

  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 8px 16px 0px;

    ${LinkTitle} {
      text-decoration: underline;
    }
  }
`
