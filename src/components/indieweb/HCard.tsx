import * as React from 'react'
import * as classnames from 'classnames'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { darken } from 'polished'

import { SiteAuthor } from '../../utils/types'
import { colors, emSizes, fonts } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface HCardProps {
  className?: string
  hidden?: boolean
  icon?: {
    sizes: { [key: string]: any }
  }
  author: SiteAuthor
}

const HCardName = styled.h3`
  margin-top: 0;
  font-family: ${fonts.sansSerif};
  color: ${colors.white};
`

const HCardNote = styled.p`
  font-size: ${emSizes.headingSmall.h4}rem;
`

const HCardAvatar = styled.div`
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const HCardAvatarImg = styled.img`
  width: 180px;
  height: 180px;
  margin: 0;
`

const HCardDetails = styled.div`
  flex: 1;
  padding: 1.5rem;
`

const HCardEmail = styled.a`
  display: none;
`

const HCardFooter = styled.div`
  margin-top: 1rem;
`

const HCardSocialLinks = styled.span`
  &:not(:first-of-type) {
    margin-left: 0.5rem;

    &:before {
      content: '/';
      margin-right: 0.5rem;
    }
  }
`

const HCard: React.SFC<HCardProps> = ({ className, icon, author }) => (
  <div className={classnames(className, 'h-card')}>
    <HCardAvatar>
      <HCardAvatarImg className="u-photo" src={icon.sizes.src} alt={author.name} />
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
      <HCardEmail className="u-email" href={`mailto:${author.email}`}>
        {author.email}
      </HCardEmail>
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
  </div>
)

export default styled(HCard)`
  display: ${props => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  margin: 0;
  background-color: ${colors.ink90};
  color: ${darken(0.3, colors.white)};

  p {
    margin: 0.5rem 0;
  }

  a {
    color: ${colors.white};
  }

  ${media.md`
    flex-direction: row;
  `};
`
