import * as React from 'react'
import styled from 'react-emotion'
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
  const url = new URL(link!)

  return (
    <Root
      className="u-bookmark-of h-cite p-name"
      href={link}
      inPostList={inPostList}
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkHeader>
        <LinkTitle>{title}</LinkTitle> &raquo;
      </LinkHeader>
      <LinkSource>({url.host})</LinkSource>
    </Root>
  )
}

export default BookmarkLink

const BookmarkTitle = PostTitle.withComponent('h3')

const LinkHeader = styled(BookmarkTitle)`
  margin: 0;
  padding: 1rem;
  color: ${colors.white};
`

const LinkTitle = styled('span')``

const LinkSource = styled('span')`
  display: block;
  padding: 0.5rem 1rem;
  background-color: ${colors.ink90};
`

const Root = styled('a')`
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

    ${LinkTitle} {
      text-decoration: underline;
    }
  }
`
