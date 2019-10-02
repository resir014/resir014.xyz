import * as React from 'react'
import styled from '@emotion/styled'

import { Container } from '../ui'

import ccLogo from '../../assets/images/cc-by-nc-sa.svg'
import { P, Small, space, colors, breakpoints } from '../chungking-core'

const StyledFooter = styled('footer')`
  padding: ${space.md}px ${space.lg}px;
`

const FooterContent = styled('div')`
  a {
    color: ${colors.green30};
    text-decoration: underline;

    &:hover,
    &:focus {
      color: ${colors.green30};
    }

    @media (min-width: ${breakpoints.md}px) {
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

const Footer: React.FC<FooterProps> = ({ size }) => (
  <StyledFooter>
    <Container size={size}>
      <FooterContent>
        <P>
          <a
            rel="license noopener noreferrer"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
          >
            <img alt="Creative Commons License" src={ccLogo} style={{ height: '31px' }} />
          </a>
        </P>
        <P>
          <Small>
            Except where otherwise noted, contents are licensed under{' '}
            <a
              rel="license noopener noreferrer"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
            >
              CC-BY-NC-SA 4.0
            </a>
            .
          </Small>
        </P>
        <P>
          <Small>
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
          </Small>
        </P>
      </FooterContent>
    </Container>
  </StyledFooter>
)

Footer.defaultProps = {
  size: 'md'
}

export default Footer
