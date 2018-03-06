import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { darken } from 'polished'

import flavors from '../../utils/flavorText'
import { colors, fonts, emSizes } from '../../styles/variables'
import { media, onEvent } from '../../styles/mixins'

import Container from './Container'

const ccLogo = require('../../assets/images/cc-by-nc-sa.svg')

const StyledFooter = styled.footer`
  padding: 1rem ${emSizes.containerPadding}rem;
  color: ${darken(0.4, colors.white)};
  background-color: ${colors.ink90};
`

const FooterHeader = styled.div`
  margin-bottom: 1rem;
`

const FooterContent = styled.div`
  a {
    color: ${colors.blue40};
    text-decoration: underline;

    &:hover,
    &:focus {
      color: ${colors.blue50};
    }

    ${media.md`
      text-decoration: none;

      ${onEvent()`
        text-decoration: underline;
      `}
    `};
  }

  p,
  small {
    display: block;
    margin: 0;
  }
`

const FooterTitle = styled(Link)`
  color: ${colors.white};

  ${onEvent()`
    text-decoration: none;
  `};
`

const FooterItem = styled.span`
  :not(:first-child) {
    margin-left: 0.5rem;

    &:before {
      content: '/';
      margin-right: 0.5rem;
    }
  }
`

const FooterSplash = styled(FooterItem)`
  cursor: pointer;
`

interface FooterProps {
  title: string
}

interface FooterState {
  randomSplashIndex: number
}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props)
    this.state = {
      randomSplashIndex: 0
    }
  }

  public componentWillMount() {
    this.randomiseSplash()
  }

  public randomiseSplash() {
    this.setState({
      randomSplashIndex: Math.floor(Math.random() * flavors.length)
    })
  }

  public render() {
    const { randomSplashIndex } = this.state

    return (
      <StyledFooter>
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
              </a>.
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
              </a>. Code licensed under the{' '}
              <a href="https://github.com/resir014/resir014.xyz" target="_blank">
                MIT License
              </a>.
            </small>
          </p>
        </FooterContent>
      </StyledFooter>
    )
  }
}

export default Footer
