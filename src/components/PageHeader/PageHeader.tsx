import * as React from 'react'
import { css, merge } from 'glamor'

import { sectionHeading, highlightedText } from '../../utils/mixins'
import { colors, headerColors, breakpoints, widths } from '../../utils/theme'
import { Container } from '../Container'

// TODO: stop using this when we finally convert to Photon colors:
// http://design.firefox.com/photon/visuals/color.html
const getHeaderColor = (index: number) => headerColors[index]

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
  }
})

const generateHeaderImage = (state: PageState, headerImage?: string) => {
  if (headerImage) {
    return css({
      position: 'relative',
      background: `linear-gradient(to bottom right,
        ${getHeaderColor(state.gradientStartIndex).gradientStart},
        ${getHeaderColor(state.gradientStartIndex).gradientEnd})`,
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
      background: `linear-gradient(to bottom right,
        ${getHeaderColor(state.gradientStartIndex).gradientStart},
        ${getHeaderColor(state.gradientStartIndex).gradientEnd})`,
    })
  }
}

interface PageProps {
  headerImage?: string
}

interface PageState {
  gradientStartIndex: number
  gradientEndIndex: number
}

class PageHeader extends React.Component<PageProps, PageState> {
  constructor (props: PageProps) {
    super(props)
    this.state = {
      gradientStartIndex: 0,
      gradientEndIndex: 0
    }
  }

  public componentWillMount() {
    this.setState({
      gradientStartIndex: Math.floor(Math.random() * headerColors.length),
      gradientEndIndex: Math.floor(Math.random() * headerColors.length)
    })
  }

  public render() {
    const { headerImage, children } = this.props
    return (
      <header className={`${pageHeaderClass} ${generateHeaderImage(this.state, headerImage)}`}>
        <Container>
          <div className={`${pageHeaderInnerClass}`}>
            <div className={`${pageHeaderTitleClass}`}>{children}</div>
          </div>
        </Container>
      </header>
    )
  }
}

export default PageHeader
