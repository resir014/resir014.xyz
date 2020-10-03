import * as React from 'react'
import classnames from 'clsx'
import styled from '@emotion/styled'

import { Box, colors, Heading, Text } from '~/components/chungking-core'
import { SiteAuthor } from '~/types/default'

interface PostHCardProps {
  className?: string
  hidden?: boolean
  image?: string
  author: SiteAuthor
}

const HCardAvatarImg = styled('img')`
  width: 64px;
  height: 64px;
  margin: 0;
  border: 2px solid ${colors.white};
  border-radius: 64px;
`

const HCardEmail = styled('a')`
  display: none;
`

const HeadingAnchor = styled(Heading)<{ rel?: string; target?: string; href?: string }>``

const PostHCard: React.FC<PostHCardProps> = ({ className, hidden, image, author }) => (
  <Box className={classnames(className, 'p-author h-card')} display={hidden ? 'none' : 'inline-block'} my="xl">
    <Box display="flex" flexDirection="row" alignItems="center" textAlign="left" color="inherit">
      <Box display="flex" position="relative" textAlign="center" alignItems="center" justifyContent="flex-start" mb={0}>
        <HCardAvatarImg className="u-photo" src={image || author.avatar} alt={author.name} />
      </Box>
      <Box flex="1 1 auto" ml="lg">
        <HeadingAnchor
          as="a"
          variant={500}
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
      </Box>
    </Box>
  </Box>
)

export default PostHCard
