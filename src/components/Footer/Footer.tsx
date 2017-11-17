import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Link from 'gatsby-link'
import * as Color from 'color'
import { merge } from 'glamor'
import { StyleSheet, css } from 'glamor/aphrodite'

import { ApplicationState } from '../../store'
import { LayoutState, randomiseSplash } from '../../store/layout'
import flavorText from '../../utils/flavorText'
import { photonColors, breakpoints, fonts, sharedStyles } from '../../utils/theme'
import { highlightedText } from '../../utils/mixins'

import { Container } from '../Container'

const styles = StyleSheet.create({
  footer: {
    marginTop: '3rem',
    padding: '2rem 0',
    color: photonColors.white,
    backgroundColor: photonColors.grey90,

    '& a': merge(sharedStyles.link, {
      color: photonColors.blue40,

      '&:hover, &:focus': {
        color: photonColors.blue50,
      }
    }),

    '& p, & small': {
      display: 'block',
      margin: '0 !important'
    }
  },
  footerHeader: {
    marginBottom: '1rem',

    '& .footer-title': {
      marginTop: 0,
      marginBottom: '0.5rem',
      fontFamily: fonts.sansSerif,
      fontWeight: 400,
      fontSize: '1.25rem',

      [breakpoints.lg]: {
        fontSize: '1.5rem'
      },

      '& a': merge(highlightedText(photonColors.white, 0, '0.25rem'), {
        color: photonColors.grey90,
        textDecoration: 'none',

        '&:hover, &:focus': {
          textDecoration: 'none'
        }
      })
    },

    '& .footer-flavour': {
      fontFamily: fonts.serif,
      fontWeight: 400,
      fontSize: '1.25rem',
      cursor: 'pointer',

      [breakpoints.lg]: {
        fontSize: '1.5rem'
      },

      '& span': merge(highlightedText(photonColors.orange50, 0, '0.25rem'), {
        color: photonColors.grey90
      })
    },
  }
})

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
      <footer className={css(styles.footer)}>
        <Container>
          <div className={css(styles.footerHeader)}>
            <h3 className="footer-title"><Link to="/">{this.props.title}</Link></h3>
            <p className="footer-flavour" title="Click to randomise!" onClick={() => this.props.dispatch(randomiseSplash())}>
              <span>{flavorText[this.props.randomSplashIndex]}</span>
            </p>
          </div>
          <p>
          <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" />
          </a>
          </p>
          <p>
            <small>
            Except where otherwise noted, contents are licensed under{' '}
            <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA 4.0</a>.
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
      </footer>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => state.layout

export default connect<LayoutState, void, FooterProps>(mapStateToProps)(Footer)

