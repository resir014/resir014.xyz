import * as React from 'react'
import Link from 'gatsby-link'
import { css, merge } from 'glamor'

import { Masthead } from '../components/Masthead'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Widget } from '../components/Widget'

import { colors, headerColors, breakpoints, widths } from '../utils/theme'
import { sectionHeading, highlightedText } from '../utils/mixins'
import flavorText from '../utils/flavorText'

const getHeaderColor = () => headerColors[Math.floor(Math.random() * headerColors.length)]

const homepageWrapper = css({
  position: 'relative',
  height: '100%',
  background: `linear-gradient(to bottom right, ${getHeaderColor().gradientStart}, ${getHeaderColor().gradientEnd})`,
  zIndex: 1,

  ':before': {
    content: ' ',
    position: 'absolute',
    zIndex: -1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundImage: `url(/images/background.jpg)`,
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
    mixBlendMode: 'luminosity',
    opacity: 0.7
  }
})

const homepageWrapperInner = css({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: widths.normal,

  [breakpoints.lg]: {
    maxWidth: widths.large
  }
})

const homepageContent = css({
  padding: '5rem 0',

  '& .homepage-title': {
    marginTop: 0,
    color: colors.black,

    '& span': merge(sectionHeading(colors.white, '.25rem', '.25rem')),

    [breakpoints.lg]: {
      fontSize: '3rem'
    }
  },

  '& .homepage-flavour': {
    margin: 0,
    fontSize: '1.25rem',
    color: colors.black,

    '& span': merge(sectionHeading(colors.white, 0, '.25rem')),

    [breakpoints.md]: {
      fontSize: '1.5rem'
    }
  },

  [breakpoints.lg]: {
    padding: '10rem 0'
  }
})

const homeflavour = css(merge(highlightedText(colors.orange3, 0, '.25rem')))

const homeAboutButton = css({
  margin: '2rem 0',

  '& a': {
    padding: '.5rem 1rem',
    fontSize: '1.25rem',
    color: colors.white,
    border: `3px solid ${colors.white}`,

    '&:hover, &:focus': {
      color: colors.black,
      textDecoration: 'none',
      backgroundColor: colors.white
    }
  }
})

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const IndexPage: React.SFC<IndexPageProps> = ({ children, data }) => (
  <div className={`${homepageWrapper}`}>
    <Masthead title={data.site.siteMetadata.title} isHomepage={true} />
    <main className={`${homepageWrapperInner}`}>
      <div className={`${homepageContent}`}>
        <h1 className="homepage-title"><span>Hey, call me Resi.</span></h1>
        <p className="homepage-flavour"><span>I'm a professional web developer based in Jakarta, Indonesia.</span></p>
        <div className={`${homeAboutButton}`}>
          <Link to="/about">More about me</Link>
        </div>
      </div>
    </main>
  </div>
)

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
