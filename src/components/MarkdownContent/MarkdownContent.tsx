import * as React from 'react'
import { css } from 'glamor'
import * as Color from 'color'

import flavorText from '../../utils/flavorText'
import { colors, headerColors, breakpoints, widths } from '../../utils/theme'
import { sectionHeading, highlightedText } from '../../utils/mixins'

const getBorderColor = headerColors[Math.floor(Math.random() * headerColors.length)].gradientStart

const markdownContentClass = css({
  marginTop: '3rem',

  '& li + li': {
    marginTop: '.25rem',
  },

  '& figure': {
    textAlign: 'center',

    '& img': {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },

  '& .gatsby-highlight': {
    margin: '1rem 0',
    fontSize: '85%'
  },

  '& .post-subtitle, & .page-subtitle': {
    margin: '3rem 0',
    padding: '1rem 0',
    borderTop: `4px solid ${getBorderColor}`,
    borderBottom: `4px solid ${getBorderColor}`,
    fontSize: '1.25rem',
    fontWeight: 300,

    [breakpoints.sm]: {
      width: '75%',
      fontSize: '1.5rem'
    }
  },

  '& .message': {
    marginBottom: '1rem',
    padding: '1rem',
    color: Color(colors.black).lighten(0.25).hex(),
    backgroundColor: Color(colors.white).darken(0.05).hex(),

    '& p:last-child': {
      marginBottom: 0
    }
  }
})

interface MarkdownContentProps {
  html: string
}

const MarkdownContent: React.SFC<MarkdownContentProps> = ({ html }) => (
  <div className={`${markdownContentClass}`} dangerouslySetInnerHTML={{ __html: html }} />
)

export default MarkdownContent
