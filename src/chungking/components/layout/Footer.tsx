import * as React from 'react'
import styled from '@emotion/styled'

import { colors, emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'
import { Container } from '../ui'

const ccLogo = require('../../../assets/images/cc-by-nc-sa.svg')

const StyledFooter = styled('footer')`
  padding: 1rem ${emSizes.containerPadding}rem;
`

const FooterContent = styled('div')`
  a {
    color: ${colors.blue30};
    text-decoration: underline;

    &:hover,
    &:focus {
      color: ${colors.blue30};
    }

    @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
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

const Footer: React.FC = () => (
  <StyledFooter>
    <Container>
      <FooterContent>
        <p>
          <a
            rel="license noopener noreferrer"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
          >
            <img alt="Creative Commons License" src={ccLogo} style={{ height: '31px' }} />
          </a>
        </p>
        <p>
          <small>
            Except where otherwise noted, contents are licensed under{' '}
            <a
              rel="license noopener noreferrer"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
            >
              CC-BY-NC-SA 4.0
            </a>
            .
          </small>
        </p>
        <p>
          <small>
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
          </small>
        </p>
      </FooterContent>
    </Container>
  </StyledFooter>
)

export default Footer
