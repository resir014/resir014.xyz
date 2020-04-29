import * as React from 'react'
import classnames from 'clsx'
import styled from '@emotion/styled'

import { SiteAuthor } from '../../types/default'
import { ChildImageSharp } from '../../types/gatsby'
import {
  Heading,
  Paragraph,
  colors,
  mediaQueries,
  UnstyledAnchor,
  Box,
  NavLinkButton
} from '../chungking-core'

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
  margin-bottom: 24px;

  ${mediaQueries.lg} {
    margin-bottom: 0;
  }
`

const HCardAvatarImg = styled('img')`
  width: 128px;
  height: 128px;
  margin: 0;
  border-radius: 128px;
  border: 2px solid ${colors.white};
`

const HCardDetails = styled('div')`
  flex: 1;

  ${mediaQueries.lg} {
    margin-left: 24px;
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
  <Box
    className={classnames(className, 'h-card')}
    display={hidden ? 'none' : 'block'}
    my="xl"
    color="inherit"
  >
    <Inner>
      <HCardAvatar>
        <HCardAvatarImg className="u-photo" src={icon.fluid.src} alt={author.name} />
      </HCardAvatar>
      <HCardDetails>
        <Heading as="h3" variant={700} mt={0} mb="xs">
          <UnstyledAnchor className="p-name u-url" rel="me" href={author.website}>
            {author.name}
          </UnstyledAnchor>
        </Heading>
        <Paragraph className="p-note" variant={500} m={0} fontWeight={300}>
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
  </Box>
)

export default HCard

const Inner = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;

  ${mediaQueries.lg} {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
`
