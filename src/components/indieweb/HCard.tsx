import * as React from 'react'
import classnames from 'classnames'
import styled from '@emotion/styled'

import { SiteAuthor } from '../../types/default'
import { ChildImageSharp } from '../../types/gatsby'
import { NavLinkButton } from '../ui'
import { Heading, Paragraph, colors, breakpoints, layerShadows } from '../chungking-core'

interface HCardProps {
  className?: string
  hidden?: boolean
  icon: ChildImageSharp
  author: SiteAuthor
}

const HCardAvatar = styled('div')`
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  @media (min-width: ${breakpoints.lg}px) {
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

  @media (min-width: ${breakpoints.lg}px) {
    margin-left: 1.5rem;
  }
`

const HCardEmail = styled('span')`
  display: none;
`

const HCardFooter = styled('div')`
  margin: 16px 0 8px;
  word-wrap: break-word;
`

const HCard: React.SFC<HCardProps> = ({ className, hidden, icon, author }) => (
  <Div className={classnames(className, 'h-card')} hidden={hidden}>
    <Inner>
      <HCardAvatar>
        <HCardAvatarImg className="u-photo" src={icon.fluid.src} alt={author.name} />
      </HCardAvatar>
      <HCardDetails>
        <Heading as="h3" scale="paragon" mt={0} mb="xs">
          <a className="p-name u-url" rel="me" href={author.website}>
            {author.name}
          </a>
        </Heading>
        <Paragraph className="p-note" scale="greatPrimer" m={0} fontWeight={300}>
          {author.description}
        </Paragraph>
        <HCardEmail className="u-email">{author.email}</HCardEmail>
        <HCardFooter>
          <NavLinkButton to="/contact" ghosted>
            Contact me &rarr;
          </NavLinkButton>
        </HCardFooter>
      </HCardDetails>
    </Inner>
  </Div>
)

export default HCard

const Inner = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (min-width: ${breakpoints.lg}px) {
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
  box-shadow: ${layerShadows.single};

  p {
    margin: 0.5rem 0;
  }

  a {
    color: ${colors.white};
  }
`
