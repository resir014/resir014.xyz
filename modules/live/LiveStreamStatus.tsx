import { css } from '@emotion/core'
import * as React from 'react'
import { Anchor, Box, Heading, MessageBox, Paragraph, Skeleton, Text } from '@resir014/chungking-core'
import { useTwitchData } from '~/lib/twitch-api'

interface LiveStreamStatusProps {
  username?: string
}

const LiveStreamViewCount: React.FC<LiveStreamStatusProps> = ({ username }) => {
  const { data, isLoading } = useTwitchData(username)

  if (isLoading) {
    return <Skeleton width="100%" maxHeight={14} mt={10} mb={2} />
  }

  if (data) {
    return (
      <Text as="p" display="block" variant={400} mt="xs">
        Streaming to {data?.viewer_count} viewers
      </Text>
    )
  }

  return null
}

const LiveStreamTitle: React.FC<LiveStreamStatusProps> = ({ username }) => {
  const { data, isLoading } = useTwitchData(username)

  if (isLoading) {
    return (
      <Box>
        <Skeleton width="100%" height={18} my={4} />
        <Skeleton display={['none', null, null, null, 'block']} width="100%" height={18} my={4} />
        <Skeleton display={['none', null, null, null, 'block']} width="66%" height={18} my={4} />
      </Box>
    )
  }

  if (data) {
    return <Paragraph display="block">{data?.title}</Paragraph>
  }

  return <Paragraph display="block">Follow {username} on Twitch to be notified when they go online!</Paragraph>
}

const LiveStreamRedirectLink: React.FC<LiveStreamStatusProps> = ({ username }) => {
  const { data, isLoading } = useTwitchData(username)

  if (isLoading) {
    return <Skeleton width="100%" maxHeight={16} my={2} />
  }

  if (data) {
    return (
      <Text variant={400}>
        <Anchor href={`https://www.twitch.tv/${username}`} target="_blank" rel="noopener noreferrrer">
          Join the conversation on Twitch &rarr;
        </Anchor>
      </Text>
    )
  }

  return (
    <Text variant={400}>
      <Anchor href={`https://www.twitch.tv/${username}`} target="_blank" rel="noopener noreferrrer">
        Follow on Twitch and get notified &rarr;
      </Anchor>
    </Text>
  )
}

const LiveStreamStatus: React.FC<LiveStreamStatusProps> = ({ username }) => {
  const { data, isLoading, isError } = useTwitchData(username)

  return (
    <Box display="flex" flexDirection="column" flex="1 1 auto">
      <Box pt="md" px="md">
        <Text
          variant={300}
          display="block"
          fontFamily="monospace"
          fontWeight={300}
          mb="sm"
          css={css`
            text-transform: uppercase;
          `}
        >
          Stream Status
        </Text>
        {isLoading ? (
          <Skeleton width="100%" maxHeight={[18, null, null, null, 20]} my={2} />
        ) : (
          <Heading as="h4" variant={600}>
            {username} is {data ? 'online' : 'offline'}
          </Heading>
        )}
        <LiveStreamViewCount username={username} />
      </Box>
      <Box flex="1 1 auto" px="md" py="md">
        <LiveStreamTitle username={username} />
      </Box>
      {isError && (
        <Box px="md" pb="md">
          <MessageBox variant="warning">
            <Text>Failed retrieving stream status.</Text>
          </MessageBox>
        </Box>
      )}
      <Box px="md" pb="md">
        <LiveStreamRedirectLink username={username} />
      </Box>
    </Box>
  )
}

export default LiveStreamStatus
