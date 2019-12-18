import * as React from 'react'
import classnames from 'classnames'
import styled from '@emotion/styled'

import { ChildImageSharp } from '../../types/gatsby'
import { SiteAuthor } from '../../types/default'
import { Heading, Text, colors, UnstyledAnchor, Box, space } from '../chungking-core'

interface HCardPostProps {
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
  justify-content: flex-start;
  margin-bottom: 0;
`

const HCardAvatarImg = styled('img')`
  width: 64px;
  height: 64px;
  margin: 0;
  border: 2px solid ${colors.white};
  border-radius: 64px;
`

const HCardDetails = styled('div')`
  flex: 1;
  margin-left: 24px;
`

const HCardEmail = styled('a')`
  display: none;
`

const Anchor = styled(UnstyledAnchor)`
  display: ${(props: { hidden?: boolean }) => (props.hidden ? 'none' : 'inline-block')};
  margin: ${space.xl}px 0;
  padding: 0;
`

const HCardPost: React.SFC<HCardPostProps> = ({ className, icon, hidden, author }) => (
  <Anchor
    rel="author"
    className={classnames(className, 'p-author h-card')}
    href="/"
    hidden={hidden}
  >
    <Box display="flex" flexDirection="row" alignItems="center" textAlign="left" color="inherit">
      <HCardAvatar>
        <HCardAvatarImg className="u-photo" src={icon.fluid.src} alt={author.name} />
      </HCardAvatar>
      <HCardDetails>
        <Heading as="h4" scale="greatPrimer" m={0} className="p-name">
          {author.name}
        </Heading>
        <Text as="p" mt="xxs" mb={0} className="p-note">
          {author.description}
        </Text>
        <HCardEmail className="u-email" href={`mailto:${author.email}`}>
          {author.email}
        </HCardEmail>
      </HCardDetails>
    </Box>
  </Anchor>
)

export default HCardPost
