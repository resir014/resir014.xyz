import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Link from 'gatsby-link'
import * as Color from 'color'
import styled from 'styled-components'

import { ApplicationState } from '../../store'
import { LayoutState, randomiseSplash } from '../../store/layout'
import flavorText from '../../utils/flavorText'
import { photonColors, breakpoints, fonts, sharedStyles } from '../../utils/theme'
import { highlightedText, sectionHeading } from '../../utils/mixins'

import Container from '../Container'

const StyledFooter = styled.footer`
  margin-top: 3rem;
  padding: 2rem 0;
  color: ${photonColors.white};
  background-color: ${photonColors.grey90};

  a {
    color: ${photonColors.blue40};
    text-decoration: underline;

    &:hover, &:focus {
      color: ${photonColors.blue50};
    }

    ${breakpoints.md} {
      text-decoration: none;

      &:hover, &:focus {
        text-decoration: underline;
      }
    }
  }

  p, small {
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
      background-color: ${photonColors.white};
      color: ${photonColors.grey90};
      text-decoration: none;

      &:hover, &:focus {
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
      background-color: ${photonColors.orange50};
      color: ${photonColors.grey90};
    }
  }
`

interface FooterProps {
  title: string
  dispatch?: Dispatch<LayoutState>
}

class Footer extends React.Component<FooterProps & LayoutState> {
  constructor(props: FooterProps & LayoutState) {
    super(props)
  }

  public componentWillMount() {
    this.props.dispatch(randomiseSplash())
  }

  public render() {
    return (
      <StyledFooter>
        <Container>
          <FooterHeader>
            <h3 className="footer-title"><Link to="/">{this.props.title}</Link></h3>
            <p className="footer-flavour" title="Click to randomise!" onClick={() => this.props.dispatch(randomiseSplash())}>
              <span>{flavorText[this.props.randomSplashIndex]}</span>
            </p>
          </FooterHeader>
          <p>
            <a
              rel="license noopener noreferrer"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
            >
              <img alt="Creative Commons License" src="/images/cc-by-nc-sa.svg" style={{ height: '31px' }} />
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
              Powered by <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a>{' '}
              and <a href="https://www.reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>.{' '}
              Code licensed under the <a href="https://github.com/resir014/resir014.xyz" target="_blank">MIT License</a>.
            </small>
          </p>
        </Container>
      </StyledFooter>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, FooterProps>(mapStateToProps)(Footer)

