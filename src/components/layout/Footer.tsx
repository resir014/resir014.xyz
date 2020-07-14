import * as React from 'react'
import styled from '@emotion/styled'
import { useStaticQuery, graphql } from 'gatsby'

import Container from './Container'

import ccLogo from '../../assets/images/cc-by-nc-sa.svg'
import { SiteMetadata } from '../../types/gatsby'
import { space, colors, mediaQueries, Stack, Box, Text } from '../chungking-core'

const StyledFooter = styled('footer')`
  border-top: 1px solid ${colors.grey90};
  padding: ${space.lg}px;
`

const FooterContent = styled('div')`
  a {
    color: ${colors.green30};
    text-decoration: underline;

    &:hover,
    &:focus {
      color: ${colors.green30};
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

interface QueryData {
  site: {
    siteMetadata: SiteMetadata
  }
}
const Footer: React.FC<FooterProps> = ({ size }) => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      site {
        siteMetadata {
          flavourText
        }
      }
    }
  `)

  return (
    <StyledFooter>
      <Container size={size}>
        <FooterContent>
          <Stack spacing="xl">
            <Box>
              <Text as="p" display="block" variant={600}>
                <Text fontWeight={700}>@resir014</Text>{' '}
                <Text>{data.site.siteMetadata.flavourText}</Text>
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection={['column', null, null, null, 'row']}
              alignItems={['flex-start', null, null, null, 'center']}
            >
              <a
                rel="license noopener noreferrer"
                href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
              >
                <img
                  alt="Creative Commons License"
                  src={ccLogo}
                  style={{ height: '31px', margin: 0 }}
                />
              </a>
              <Box mt={['md', null, null, null, 0]} ml={[0, null, null, null, 'md']}>
                <Text as="p" display="block" variant={200}>
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
                <Text as="p" display="block" variant={200}>
                  Powered by{' '}
                  <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">
                    Gatsby
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
          </Stack>
        </FooterContent>
      </Container>
    </StyledFooter>
  )
}

Footer.defaultProps = {
  size: 'md'
}

export default Footer
