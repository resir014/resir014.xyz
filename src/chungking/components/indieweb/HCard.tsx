import * as React from 'react'
import classnames from 'classnames'
import styled from '@emotion/styled'

import { colors, emSizes, fonts, pxSizes } from '../../styles/variables'
import { SiteAuthor } from '../../types/default'
import { ChildImageSharp } from '../../../types/gatsby'
import Container from '../ui/Container'
import { getEmSize } from '../../styles/mixins'

interface HCardProps {
  className?: string
  hidden?: boolean
  icon: ChildImageSharp
  author: SiteAuthor
}

const HCardName = styled('h3')`
  margin-top: 0;
  margin-bottom: 0.5rem;
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

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin-bottom: 0;
  }
`

const HCardAvatarImg = styled('img')`
  width: 128px;
  height: 128px;
  margin: 0;
  border-radius: 128px;
`

const HCardDetails = styled('div')`
  flex: 1;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin-left: 1.5rem;
  }
`

const HCardEmail = styled('span')`
  display: none;
`

const HCardFooter = styled('div')`
  margin-top: 1rem;
  word-wrap: break-word;
`

const HCardSocialLinks = styled('span')`
  display: block;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.sm)}) {
    display: inline-block;

    &:not(:first-of-type) {
      margin-left: 0.5rem;

      &:before {
        content: '/';
        margin-right: 0.5rem;
      }
    }
  }
`

export const HCard: React.SFC<HCardProps> = ({ className, hidden, icon, author }) => (
  <Div className={classnames(className, 'h-card')} hidden={hidden}>
    <Container size="xl">
      <Inner>
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
      </Inner>
    </Container>
  </Div>
)

const Inner = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
`

const Div = styled('div')`
  display: ${(props: { hidden?: boolean }) => (props.hidden ? 'none' : 'block')};
  margin: 1.5rem 0;
  padding: 1.5rem;
  color: ${colors.grey10};
  background: linear-gradient(to right, ${colors.ultramarine30}, ${colors.green30});
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 2px 4px 0;

  p {
    margin: 0.5rem 0;
  }

  a {
    color: ${colors.white};
  }
`
