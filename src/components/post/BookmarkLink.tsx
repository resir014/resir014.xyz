import * as React from 'react'
import styled from 'react-emotion'
import Url from 'url-parse'
import { colors } from '../../styles/variables'
import PostTitle from './PostTitle'

interface RootProps {
  inPostList?: boolean
}

interface BookmarkLinkProps extends RootProps {
  link?: string
  title: string
}

const BookmarkLink: React.SFC<BookmarkLinkProps> = ({ link, inPostList, title }) => {
  const url = new Url(link!)

  return (
    <Root inPostList={inPostList}>
      <LinkHeader>
        <LinkTitle
          className="u-bookmark-of h-cite p-name"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </LinkTitle>{' '}
        &raquo;
      </LinkHeader>
      <LinkSource className="p-publication">{url.host}</LinkSource>
    </Root>
  )
}

export default BookmarkLink

const BookmarkTitle = PostTitle.withComponent('h3')

const LinkHeader = styled(BookmarkTitle)`
  padding: 1rem;
  margin: 0;
  color: ${colors.white};
`

const LinkTitle = styled('a')`
  &:hover,
  &:focus {
    ${LinkHeader} {
      text-decoration: underline;
    }
  }
`

const LinkSource = styled('span')`
  display: block;
  padding: 0.5rem 1rem;
  background-color: ${colors.ink90};
  user-select: none;
`

const Root = styled('div')`
  display: block;
  margin-top: ${(props: RootProps) => (props.inPostList ? 0 : '1rem')};
  margin-bottom: ${(props: RootProps) => (props.inPostList ? '1rem' : 0)};
  background-color: ${colors.ink70};
  color: ${colors.white};
  border-radius: 4px;
  overflow: hidden;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`
