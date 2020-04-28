import * as React from 'react'
import classnames from 'clsx'
import styled from '@emotion/styled'

import { ChildImageSharp } from '../../types/gatsby'
import { SiteAuthor } from '../../types/default'
import { Heading, Text, colors, Box } from '../chungking-core'

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

const HeadingAnchor = styled(Heading)<{ rel?: string; target?: string; href?: string }>``

const HCardPost: React.SFC<HCardPostProps> = ({ className, icon, hidden, author }) => (
  <Box
    className={classnames(className, 'p-author h-card')}
    display={hidden ? 'none' : 'inline-block'}
    my="xl"
  >
    <Box display="flex" flexDirection="row" alignItems="center" textAlign="left" color="inherit">
      <HCardAvatar>
        <HCardAvatarImg className="u-photo" src={icon.fluid.src} alt={author.name} />
      </HCardAvatar>
      <HCardDetails>
        <HeadingAnchor
          as="a"
          scale={500}
          display="block"
          m={0}
          className="p-name u-url"
          rel="author noopener noreferrer"
          target="_blank"
          href={author.website || '/'}
        >
          {author.name}
        </HeadingAnchor>
        <Text as="p" mt="xxs" mb={0} className="p-note">
          {author.description}
        </Text>
        <HCardEmail className="u-email" href={`mailto:${author.email}`}>
          {author.email}
        </HCardEmail>
      </HCardDetails>
    </Box>
  </Box>
)

export default HCardPost
