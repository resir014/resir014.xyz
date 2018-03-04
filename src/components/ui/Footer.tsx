import * as React from 'react'
import Link from 'gatsby-link'
import * as Color from 'color'
import styled from 'styled-components'

import flavors from '../../utils/flavorText'
import { colors, fonts, emSizes } from '../../styles/variables'
import { media, onEvent } from '../../styles/mixins'

import Container from './Container'

const ccLogo = require('../../assets/images/cc-by-nc-sa.svg')

const StyledFooter = styled.footer`
  padding: 2rem ${emSizes.containerPadding}rem;
  color: ${colors.white};
  background-color: ${colors.ink90};

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

const FooterHeader = styled.div`
  margin-bottom: 1rem;

  .footer-title {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-family: ${fonts.sansSerif};
    font-weight: 400;
    line-height: 1.25;
    font-size: 1.44rem;

    a {
      display: inline-block;
      margin: 0;
      padding: 0 0.25rem;
      background-color: ${colors.white};
      color: ${colors.grey90};
      text-decoration: none;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  }

  .footer-flavour {
    font-family: ${fonts.serif};
    font-weight: 400;
    line-height: 1.2;
    font-size: 1.44rem;
    cursor: pointer;

    span {
      display: inline-block;
      margin: 0;
      padding: 0 0.25rem;
      background-color: ${colors.orange50};
      color: ${colors.grey90};
    }
  }
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
        <FooterHeader>
          <h3 className="footer-title">
            <Link to="/">{this.props.title}</Link>
          </h3>
          <p
            className="footer-flavour"
            title="Click to randomise!"
            onClick={() => this.randomiseSplash()}
          >
            <span>{flavors[randomSplashIndex]}</span>
          </p>
        </FooterHeader>
        <p>
          <a
            rel="license noopener noreferrer"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
          >
            <img
              alt="Creative Commons License"
              src={ccLogo}
              style={{ height: '31px' }}
            />
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
            <a
              href="https://www.gatsbyjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gatsby
            </a>{' '}
            and{' '}
            <a
              href="https://www.reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>. Code licensed under the{' '}
            <a href="https://github.com/resir014/resir014.xyz" target="_blank">
              MIT License
            </a>.
          </small>
        </p>
      </StyledFooter>
    )
  }
}

export default Footer
