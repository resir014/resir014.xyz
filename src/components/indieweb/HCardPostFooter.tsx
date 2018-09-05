import * as React from 'react'
import * as classnames from 'classnames'
import styled from 'react-emotion'
import { darken } from 'polished'

import { SiteAuthor } from '../../utils/types'
import { colors, emSizes, fonts, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface HCardPostFooterProps {
  className?: string
  hidden?: boolean
  icon?: {
    sizes: { [key: string]: any }
  }
  author: SiteAuthor
}

const HCardName = styled('h3')`
  margin-top: 0;
  font-family: ${fonts.sansSerif};
  color: ${colors.white};
`

const HCardNote = styled('p')`
  font-size: ${emSizes.headingSmall.h4}rem;
`

const HCardAvatar = styled('div')`
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const HCardAvatarImg = styled('img')`
  width: 128px;
  height: 128px;
  margin: 0;
`

const HCardDetails = styled('div')`
  flex: 1;
  padding: 1.5rem;
`

const HCardEmail = styled('a')`
  display: none;
`

const HCardPostFooter: React.SFC<HCardPostFooterProps> = ({ className, icon, hidden, author }) => (
  <Anchor
    rel="author"
    className={classnames(className, 'p-author h-card')}
    href="/"
    hidden={hidden}
  >
    <HCardAvatar>
      <HCardAvatarImg className="u-photo" src={icon.sizes.src} alt={author.name} />
    </HCardAvatar>
    <HCardDetails>
      <HCardName className="p-name">{author.name}</HCardName>
      <HCardNote className="p-note">{author.description}</HCardNote>
      <HCardEmail className="u-email" href={`mailto:${author.email}`}>
        {author.email}
      </HCardEmail>
    </HCardDetails>
  </Anchor>
)

export default HCardPostFooter

const Anchor = styled('a')`
  display: ${(props: { hidden?: boolean }) => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  margin: 0;
  background-color: ${colors.ink90};
  color: ${darken(0.3, colors.white)};
  text-decoration: none !important;

  p {
    margin: 0.5rem 0;
  }

  a {
    color: ${colors.white};
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    flex-direction: row;
  }
`
