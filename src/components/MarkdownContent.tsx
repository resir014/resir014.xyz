import * as React from 'react'
import * as Color from 'color'
import styled from 'styled-components'

import flavorText from '../utils/flavorText'
import { colors, breakpoints, widths, sharedStyles, linkStyle, photonColors, getBorderColor } from '../utils/theme'
import { sectionHeading, highlightedText } from '../utils/mixins'

interface MarkdownContentProps {
  className?: string
  html: string
}

const MarkdownContent: React.SFC<MarkdownContentProps> = ({ className, html }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
)

export default styled(MarkdownContent)`
  a {
    color: ${photonColors.blue60};
    text-decoration: underline;

    &:hover, &:focus {
      color: ${photonColors.blue70};
    }

    ${breakpoints.md} {
      text-decoration: none;

      &:hover, &:focus {
        text-decoration: underline;
      }
    }
  }

  figure {
    margin: 2rem 0;
    text-align: center;
    background-color: ${photonColors.grey70};
    border: 8px solid ${photonColors.grey70};

    ${breakpoints.lg} {
      margin: 2rem;
    }

    img {
      display: block;
      vertical-align: middle;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 0;
    }

    figcaption {
      a {
        color: ${photonColors.blue40};

        &:hover, &:focus {
          color: ${photonColors.blue50};
        }
      }

      &:last-child {
        padding-top: 8px;
        color: ${photonColors.white};
        background-color: ${photonColors.grey70};
      }
    }
  }

  li + li {
    margin-top: .25rem;
  }

  .gatsby-highlight {
    margin: 1rem 0;
  }

  .post-subtitle, .page-subtitle {
    margin: 3rem 0;
    padding: 1rem 0;
    border-top: 4px solid ${getBorderColor};
    border-bottom: 4px solid ${getBorderColor};
    font-size: 1.25rem;
    font-weight: 300;

    ${breakpoints.sm} {
      width: 75%;
      font-size: 1.5rem;
    }
  }

  .message {
    margin-bottom: 1rem;
    padding: 1rem;
    color: ${Color(colors.black).lighten(0.25).hex()};
    background-color: ${Color(colors.white).darken(0.05).hex()};

    p:last-child {
      margin-bottom: 0;
    }
  }

  a[href^="#fn-"], a[href^="#fnref-"] {
    display: inline-block;
    margin-left: .1rem;
    font-weight: bold;
  }

  .footnotes': {
    margin-top: 2rem;
    font-size: 85%;

    li[id^="fn-"] {
      p {
        // Remark for some reason puts the footnote reflink *after* the 'p' tag.
        display: inline;
      }
    }
  }

  .lead': {
    font-size: 1.25rem;
    font-weight: 300;

    ${breakpoints.md} {
      font-size: 1.5rem;
    }
  }
`
