import * as React from 'react'
import styled from '@emotion/styled'

import { space, colors, mediaQueries, Stack, Box, Text } from '../chungking-core'
import Container from './Container'

import CCLogo from '~/assets/images/cc-by-nc-sa.svg'

const StyledFooter = styled('footer')`
  border-top: 1px solid ${colors.grey[900]};
  padding: ${space.lg}px;
`

const FooterContent = styled('div')`
  a {
    color: ${colors.turquoise[400]};
    text-decoration: underline;

    &:hover,
    &:focus {
      color: ${colors.turquoise[400]};
    }

    ${mediaQueries.md} {
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
`

interface FooterProps {
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const Footer: React.FC<FooterProps> = ({ size }) => {
  const handleOptOut = () => {
    if (typeof window.gaOptout === 'function') {
      console.log('gaOptOut')
      window.gaOptout()
    }
  }

  return (
    <StyledFooter>
      <Container size={size}>
        <FooterContent>
          <Stack spacing="xl">
            <Box>
              <Text as="p" display="block" variant={600}>
                <Text fontWeight={700}>@resir014</Text> <Text>{process.env.FLAVOUR_TEXT}</Text>
              </Text>
            </Box>
            <Box display="flex" flexDirection={['column', null, null, null, 'row']} alignItems={['flex-start', null, null, null, 'center']}>
              <a rel="license noopener noreferrer" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
                <Box as="img" alt="Creative Commons License" src={CCLogo} m={0} width={89} height={31} />
              </a>
              <Box mt={['md', null, null, null, 0]} ml={[0, null, null, null, 'md']}>
                <Text as="p" display="block" variant={200}>
                  Except where otherwise noted, contents are licensed under{' '}
                  <a rel="license noopener noreferrer" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
                    CC-BY-NC-SA 4.0
                  </a>
                  .
                </Text>
                <Text as="p" display="block" variant={200}>
                  Powered by{' '}
                  <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
                    Next.js
                  </a>{' '}
                  and{' '}
                  <a href="https://www.reactjs.org/" target="_blank" rel="noopener noreferrer">
                    React
                  </a>
                  . Code licensed under the{' '}
                  <a href="https://github.com/resir014/resir014.xyz" target="_blank" rel="noopener noreferrer">
                    MIT License
                  </a>
                  .{' '}
                  <a href="https://blacklivesmatters.carrd.co/" target="_blank" rel="noopener noreferrer">
                    #BLM
                  </a>
                </Text>
              </Box>
            </Box>
            <Box>
              <Text as="p" display="block" variant={200}>
                <a href="#" onClick={handleOptOut}>
                  Opt out of Google Analytics tracking.
                </a>
              </Text>
            </Box>
          </Stack>
        </FooterContent>
      </Container>
    </StyledFooter>
  )
}

Footer.defaultProps = {
  size: 'xl'
}

export default Footer
