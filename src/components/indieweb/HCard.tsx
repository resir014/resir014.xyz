import * as React from 'react'
import { darken } from 'polished'
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
  Text,
  UnstyledLink
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
    text-align: left;
    justify-content: flex-start;
  }
`

const HCardAvatarImg = styled('img')`
  width: 72px;
  height: 72px;
  margin: 0;
  border-radius: 72px;
  border: 2px solid ${colors.white};
`

const HCardDetails = styled('div')`
  flex: 1;
`

const HCardEmail = styled('span')`
  display: none;
`

const HCardFooter = styled('div')`
  margin: 16px 0 8px;
  word-wrap: break-word;
`

const Inner = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;

  ${mediaQueries.lg} {
    text-align: left;
  }
`

const HCard: React.FC<HCardProps> = ({ className, hidden, icon, author }) => (
  <UnstyledLink to="/contact">
    <Box
      className={classnames(className, 'h-card')}
      display={hidden ? 'none' : 'block'}
      p="md"
      backgroundColor={darken(0.25, colors.ultramarine30)}
      border="2px solid"
      borderColor="ultramarine30"
      borderRadius={8}
      color="inherit"
      boxShadow="single"
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
            <Text>Contact me &rarr;</Text>
          </HCardFooter>
        </HCardDetails>
      </Inner>
    </Box>
  </UnstyledLink>
)

export default HCard
