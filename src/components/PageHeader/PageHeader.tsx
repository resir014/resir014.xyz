import * as React from 'react'
import { css, merge } from 'glamor'

import { sectionHeading, highlightedText } from '../../utils/mixins'
import { colors, headerColors, breakpoints, widths } from '../../utils/theme'
import { Container } from '../Container'

const getHeaderColor = () => headerColors[Math.floor(Math.random() * headerColors.length)]

const pageHeaderClass = css({
  minHeight: '12rem',

  [breakpoints.lg]: {
    minHeight: '15rem'
  }
})

const pageHeaderInnerClass = css({
  display: 'flex',
  minHeight: '12rem',

  [breakpoints.lg]: {
    minHeight: '15rem'
  }
})

const pageHeaderTitleClass = css({
  alignSelf: 'flex-end',
  paddingTop: '3rem',
  fontSize: '1.25rem',

  [breakpoints.sm]: {
    width: '75%',
    fontSize: '1.5rem'
  },

  '& .page-meta, & .post-meta': {
    marginBottom: '.5rem',
    fontSize: '80%',

    '& span': merge(sectionHeading(colors.white, 0, '.5rem'))
  },

  '& .page-title, & .post-title': {
    margin: 0,
    '& span': merge(sectionHeading(colors.white, '.25rem', '.5rem'))
  },
})

const generateHeaderImage = (headerImage?: string) => {
  if (headerImage) {
    return css({
      position: 'relative',
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
        backgroundImage: `url(${headerImage})`,
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        mixBlendMode: 'color-burn',
        opacity: 0.7
      }
    })
  } else {
    return css({
      background: `linear-gradient(to bottom right, ${getHeaderColor().gradientStart}, ${getHeaderColor().gradientEnd})`,
    })
  }
}

interface PageProps {
  headerImage?: string
}

const PageHeader: React.SFC<PageProps> = ({ headerImage, children }) => {
  return (
    <header className={`${pageHeaderClass} ${generateHeaderImage(headerImage)}`}>
      <Container>
        <div className={`${pageHeaderInnerClass}`}>
          <div className={`${pageHeaderTitleClass}`}>{children}</div>
        </div>
      </Container>
    </header>
  )
}

export default PageHeader
