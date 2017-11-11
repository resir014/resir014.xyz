import * as React from 'react'
import Link from 'gatsby-link'
import * as Color from 'color'
import { merge } from 'glamor'
import { StyleSheet, css } from 'glamor/aphrodite'

import flavorText from '../../utils/flavorText'
import { colors, breakpoints, fonts } from '../../utils/theme'
import { highlightedText } from '../../utils/mixins'

import { Container } from '../Container'

const styles = StyleSheet.create({
  footer: {
    marginTop: '3rem',
    padding: '2rem 0',
    color: colors.white,
    backgroundColor: Color(colors.black).mix(Color(colors.white), 0.1),

    '& p, & small': {
      display: 'block',
      margin: 0
    }
  },
  footerHeader: {
    marginBottom: '1rem',

    '& .footer-title': {
      marginTop: 0,
      fontFamily: fonts.sansSerif,
      fontWeight: 400,
      fontSize: '1.25rem',

      [breakpoints.lg]: {
        fontSize: '1.5rem'
      },

      '& a': merge(highlightedText(colors.white, 0, '0.25rem'), {
        color: colors.black,

        '&:hover, &:focus': {
          textDecoration: 'none'
        }
      })
    },

    '& .footer-flavour': {
      fontFamily: fonts.serif,
      fontWeight: 400,
      fontSize: '1.25rem',

      [breakpoints.lg]: {
        fontSize: '1.5rem'
      },

      '& span': merge(highlightedText(colors.orange3, 0, '0.25rem'), {
        color: colors.black
      })
    },
  }
})

interface FooterProps {
  title: string
}

interface FooterState {
  splash: string
}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props)

    this.state = {
      splash: 'is a web developer'
    }
  }

  public componentWillMount() {
    this.setState({ splash: flavorText[Math.floor(Math.random() * flavorText.length)] })
  }

  public render() {
    return (
      <footer className={css(styles.footer)}>
        <Container>
          <div className={css(styles.footerHeader)}>
            <h3 className="footer-title"><Link to="/">{this.props.title}</Link></h3>
            <p className="footer-flavour"><span>{this.state.splash}</span></p>
          </div>
          <p>
            <small>
            Except where otherwise noted, contents are licensed under{' '}
            <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC-BY-NC-SA 4.0</a>.
            </small>
          </p>
          <p>
            <small>
              Powered by <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>.{' '}
              Background by <a href="https://www.toptal.com/designers/subtlepatterns/" target="_blank">Subtle Patterns</a>.
            </small>
          </p>
        </Container>
      </footer>
    )
  }
}

export default Footer

