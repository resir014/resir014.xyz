import { css } from '@emotion/react';
import * as React from 'react';
import { Box, Text, BoxProps, Link, Heading } from '@resir014/chungking-react';
import { Twitch } from 'react-feather';
import { formatRelativeTime } from '~/lib/date-formatter';
import { useTwitchData } from '~/lib/twitch-api';

interface LiveStreamStatusProps extends BoxProps {
  username?: string;
}

const LiveStreamStatus: React.FC<LiveStreamStatusProps> = ({ username = 'resir014', ...rest }) => {
  const { data, isLoading, isError } = useTwitchData(username);

  const renderStreamStatus = () => {
    if (isLoading || isError) {
      return '-';
    }

    if (data) {
      return 'Online';
    }

    return 'Offline';
  };

  const renderViewCount = () => {
    if (isError) {
      return (
        <>
          <Text ml="xs" variant="sm">
            &middot;
          </Text>
          <Text display="block" variant="sm" color="red.500" ml="xs">
            Failed retrieving stream status.
          </Text>
        </>
      );
    }

    if (data) {
      return (
        <>
          <Text ml="xs" variant="sm">
            &middot;
          </Text>
          <Text display="block" variant="sm" ml="xs">
            {data.viewer_count} viewers
          </Text>
        </>
      );
    }

    return null;
  };

  const renderStreamDuration = () => {
    if (isLoading || isError) {
      return (
        <Text as="p" display="block" mt="xs">
          -
        </Text>
      );
    }

    if (data) {
      return (
        <Text as="p" display="block" mt="xs">
          Streaming for {formatRelativeTime(new Date(data.started_at))}
        </Text>
      );
    }

    return (
      <Text as="p" display="block" mt="xs">
        Follow to be notified when they go live!
      </Text>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="1 1 auto"
      position="relative"
      border="1px solid"
      borderColor="grey.800"
      borderRadius={6}
      overflow="hidden"
      _hover={{
        backgroundColor: 'grey.800',
        boxShadow: 'double',
      }}
      {...rest}
    >
      <Box px="md" pt="md">
        <Text
          variant="sm"
          display="block"
          fontFamily="monospace"
          fontWeight={300}
          css={css`
            text-transform: uppercase;
          `}
        >
          Stream Status
        </Text>
      </Box>
      <Box px="md" pt="sm" flex="1 1 auto">
        <Heading as="p" display="block" variant="3xl">
          <Link
            href={`https://www.twitch.tv/${username}`}
            target="_blank"
            rel="noopener noreferrrer"
            display="inline-block"
            css={css`
              &:hover,
              &:focus {
                text-decoration: none;
              }

              &::after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
              }
            `}
          >
            {renderStreamStatus()}
          </Link>
        </Heading>
        {renderStreamDuration()}
      </Box>
      <Box display="flex" alignItems="center" px="md" py="md">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Twitch aria-hidden size={18} />
          <Text display="block" variant="sm" ml="xs">
            {username}
          </Text>
        </Box>
        {renderViewCount()}
      </Box>
    </Box>
  );
};

export default LiveStreamStatus;
