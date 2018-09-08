import * as React from 'react'
import classnames from 'classnames'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import { darken } from 'polished'

import { colors, emSizes, fonts, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { SiteAuthor } from '../../types/default'
import { ChildImageSharp } from '../../types/gatsby'

interface HCardProps {
  className?: string
  hidden?: boolean
  icon: ChildImageSharp
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
  margin-bottom: 1.5rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    margin-bottom: 0;
    margin-right: 2rem;
  }
`

const HCardAvatarImg = styled('img')`
  width: 180px;
  height: 180px;
  margin: 0;
  border: 4px solid ${colors.white};
  border-radius: 50%;
`

const HCardDetails = styled('div')`
  flex: 1;
`

const HCardEmail = styled('span')`
  display: none;
`

const HCardFooter = styled('div')`
  margin-top: 1rem;
`

const HCardSocialLinks = styled('span')`
  &:not(:first-of-type) {
    margin-left: 0.5rem;

    &:before {
      content: '/';
      margin-right: 0.5rem;
    }
  }
`

const HCard: React.SFC<HCardProps> = ({ className, hidden, icon, author }) => (
  <Div className={classnames(className, 'h-card')} hidden={hidden}>
    <HCardAvatar>
      <HCardAvatarImg className="u-photo" src={icon.fluid.src} alt={author.name} />
    </HCardAvatar>
    <HCardDetails>
      <HCardName>
        <a className="p-name u-url" rel="me" href={author.website}>
          {author.name}
        </a>
      </HCardName>
      <HCardNote className="p-note">{author.description}</HCardNote>
      <p>
        <Link to="/about/">More about me</Link>
      </p>
      <HCardEmail className="u-email">{author.email}</HCardEmail>
      <HCardFooter>
        {Object.keys(author.url).map(key => (
          <HCardSocialLinks key={author.url[key]}>
            <a target="_blank" rel="me noopener noreferrer" href={author.url[key]}>
              {key}
            </a>
          </HCardSocialLinks>
        ))}
      </HCardFooter>
    </HCardDetails>
  </Div>
)

export default HCard

const Div = styled('div')`
  display: ${(props: { hidden?: boolean }) => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  margin: 0;
  padding: 1.5rem;
  background-color: ${colors.ink90};
  color: ${darken(0.3, colors.white)};

  p {
    margin: 0.5rem 0;
  }

  a {
    color: ${colors.white};
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    flex-direction: row;
    align-items: center;
  }
`
