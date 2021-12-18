import * as React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { theme, Stack, Box, Text } from '@resir014/chungking-react';
import { Container, ContainerSizes } from './container';

const FooterContent = styled('div')`
  a {
    color: ${theme.colors.turquoise[400]};
    text-decoration: underline;

    &:hover,
    &:focus {
      color: ${theme.colors.turquoise[400]};
    }

    ${theme.mediaQueries.md} {
      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }

  p,
  small {
    display: block;
    margin: 0;
  }
`;

export interface FooterProps {
  size?: ContainerSizes;
}

export const Footer: React.FC<FooterProps> = ({ size = 'xl' }) => {
  const handleOptOut = () => {
    if (typeof window.gaOptout === 'function') {
      console.log('gaOptOut');
      window.gaOptout();
    }
  };

  return (
    <Box padding="lg" borderTopWidth="1px" borderTopStyle="solid" borderTopColor="grey.800">
      <Container size={size}>
        <FooterContent>
          <Stack spacing="md">
            <Box>
              <Text as="p" display="block" variant="2xl">
                <Text fontWeight={700}>@resir014</Text> <Text>{process.env.FLAVOUR_TEXT}</Text>
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection={['column', null, null, null, 'row']}
              alignItems={['flex-start', null, null, null, 'center']}
            >
              <a
                className="flex"
                rel="license noopener noreferrer"
                href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
              >
                <Image
                  alt="Creative Commons License"
                  src="/static/cc-by-nc-sa.svg"
                  width={103}
                  height={36}
                />
              </a>
              <Box mt={['md', null, null, null, 0]} ml={[0, null, null, null, 'md']}>
                <Text as="p" display="block" variant="sm">
                  Except where otherwise noted, contents are licensed under{' '}
                  <a
                    rel="license noopener noreferrer"
                    href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                    target="_blank"
                  >
                    CC-BY-NC-SA 4.0
                  </a>
                  .
                </Text>
                <Text as="p" display="block" variant="sm">
                  Powered by{' '}
                  <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
                    Next.js
                  </a>{' '}
                  and{' '}
                  <a href="https://www.reactjs.org/" target="_blank" rel="noopener noreferrer">
                    React
                  </a>
                  . Code licensed under the{' '}
                  <a
                    href="https://github.com/resir014/resir014.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MIT License
                  </a>
                  .
                </Text>
              </Box>
            </Box>
            <Box>
              <Text as="p" display="block" variant="sm">
                <a href="#" onClick={handleOptOut}>
                  Opt out of Google Analytics tracking.
                </a>
              </Text>
            </Box>
          </Stack>
        </FooterContent>
      </Container>
    </Box>
  );
};
