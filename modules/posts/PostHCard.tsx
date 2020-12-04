import * as React from 'react'
import classnames from 'clsx'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { Box, BoxProps, colors, Heading, Text } from '@resir014/chungking-react'
import { SiteAuthor } from '~/types/default'

interface PostHCardProps extends BoxProps {
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

const PostHCard: React.FC<PostHCardProps> = ({ className, hidden, image, author, ...rest }) => (
  <Box
    className={classnames(className, 'p-author h-card')}
    display={hidden ? 'none' : 'inline-block'}
    my="xl"
    css={css`
      &:last-of-type {
        margin-bottom: 0;
      }
    `}
    {...rest}
  >
    <Box display="grid" gridTemplateColumns="64px 1fr" gridGap={['md', null, null, 'lg']} textAlign="left" color="inherit">
      <Box display="flex" position="relative" textAlign="center" alignItems="center" justifyContent="flex-start" mb={0}>
        <HCardAvatarImg className="u-photo" src={image || author.avatar} alt={author.name} />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box position="relative">
          <Heading as="p" display="block" variant={500} m={0}>
            <a
              className="p-name u-url"
              rel="author noopener noreferrer"
              target="_blank"
              href={author.website || '/'}
              css={css`
                &::after {
                  content: '';
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                }
              `}
            >
              {author.name}
            </a>
          </Heading>
          <Text as="p" mt="xxs" mb={0} className="p-note">
            {author.description}
          </Text>
        </Box>
        <HCardEmail className="u-email" href={`mailto:${author.email}`}>
          {author.email}
        </HCardEmail>
      </Box>
    </Box>
  </Box>
)

export default PostHCard
