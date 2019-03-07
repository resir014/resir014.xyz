import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import Url from 'url-parse'

import { colors } from '../../styles/variables'

interface RootProps {
  inPostList?: boolean
}

interface BookmarkLinkProps extends RootProps {
  link?: string
  title: string
}

const BookmarkLink: React.SFC<BookmarkLinkProps> = ({ link, inPostList, title }) => {
  const url = link ? new Url(link) : undefined

  return url ? (
    <Root
      inPostList={inPostList}
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

const Root = styled('a')`
  display: block;
  margin-top: ${(props: RootProps) => (props.inPostList ? 0 : '1rem')};
  margin-bottom: ${(props: RootProps) => (props.inPostList ? '1.5rem' : 0)};
  background: linear-gradient(to right, ${colors.blue30}, ${colors.green30});
  color: ${colors.white};
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px 0px;

  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 8px 16px 0px;

    ${LinkTitle} {
      text-decoration: underline;
    }
  }
`
