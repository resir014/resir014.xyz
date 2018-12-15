import * as React from 'react'
import classnames from 'classnames'
import styled from 'react-emotion'

import { colors, emSizes, fonts, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { ChildImageSharp } from '../../types/gatsby'
import { SiteAuthor } from '../../types/default'

interface HCardPostFooterProps {
  className?: string
  hidden?: boolean
  icon: ChildImageSharp
  author: SiteAuthor
}

const HCardName = styled('h3')`
  margin-top: 0;
  font-family: ${fonts.serif};
  color: ${colors.grey90};
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
  margin-bottom: 1.5rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    margin-bottom: 0;
    margin-right: 1.5rem;
  }
`

const HCardAvatarImg = styled('img')`
  width: 128px;
  height: 128px;
  margin: 0;
  border: 4px solid ${colors.grey90};
  border-radius: 50%;
`

const HCardDetails = styled('div')`
  margin-top: 1rem;
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
      <HCardAvatarImg className="u-photo" src={icon.fluid.src} alt={author.name} />
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
  text-align: center;
  margin: 0;
  padding: 1.5rem;
  background-color: ${colors.white};
  color: ${colors.grey70};
  text-decoration: none !important;

  p {
    margin: 0.5rem 0;
  }

  a {
    color: ${colors.grey90};
  }
`
