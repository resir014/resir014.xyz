import * as React from 'react'
import classnames from 'classnames'
import styled from '@emotion/styled'

import { colors, emSizes, pxSizes } from '../../styles/variables'
import { ChildImageSharp } from '../../../types/gatsby'
import { SiteAuthor } from '../../types/default'
import { getEmSize } from '../../styles/mixins'

interface HCardPostProps {
  className?: string
  hidden?: boolean
  icon: ChildImageSharp
  author: SiteAuthor
}

const HCardName = styled('h4')`
  margin-top: 0;
  margin-bottom: 0;
  font-size: ${emSizes.headingSmall.h4}rem;
  line-height: ${emSizes.lineHeight.heading}rem;
`

const HCardNote = styled('p')`
  margin-top: 0.5rem;
  margin-bottom: 0;
`

const HCardAvatar = styled('div')`
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin-bottom: 0;
  }
`

const HCardAvatarImg = styled('img')`
  width: 64px;
  height: 64px;
  margin: 0;
  border-radius: 64px;
`

const HCardDetails = styled('div')`
  flex: 1;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin-left: 1.5rem;
  }
`

const HCardEmail = styled('a')`
  display: none;
`

export const HCardPost: React.SFC<HCardPostProps> = ({ className, icon, hidden, author }) => (
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

const Anchor = styled('a')`
  display: ${(props: { hidden?: boolean }) => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  text-align: center;
  margin: 2rem 0;
  padding: 0;
  color: ${colors.white};
  text-decoration: none !important;

  a {
    color: ${colors.white};
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
`
