import * as React from 'react'
import { lighten, darken } from 'polished'
import styled from 'react-emotion'

import { colors, emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface MarkdownContentProps {
  className?: string
  html: string
}

const MarkdownContent: React.SFC<MarkdownContentProps> = ({ className, html }) => (
  <Div className={className} dangerouslySetInnerHTML={{ __html: html }} />
)

export default MarkdownContent

const Div = styled('div')`
  a {
    color: ${colors.blue60};

    &:hover,
    &:focus {
      color: ${colors.blue70};
    }
  }

  figure {
    margin: 2rem 0;
    text-align: center;
    background-color: ${colors.ink90};
    border: 8px solid ${colors.ink90};

    &:first-child {
      margin-top: 0;
    }

    @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
      margin-left: -${emSizes.containerPadding * 2}rem;
      margin-right: -${emSizes.containerPadding * 2}rem;
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
        color: ${colors.blue40};

        &:hover,
        &:focus {
          color: ${colors.blue50};
        }
      }

      &:last-child {
        padding-top: 8px;
        color: ${colors.white};
        background-color: ${colors.ink90};
      }
    }
  }

  li + li {
    margin-top: 0.25rem;
  }

  .gatsby-highlight {
    margin: 1rem 0;
    font-size: 90%;
  }

  *:not(pre) > code[class*='language-'] {
    padding: 0.125rem 0.25rem;
    font-size: 90%;
    border-radius: 3px;
  }

  .post-subtitle,
  .page-subtitle {
    margin: 1.5rem 0 3rem;
    padding: 1rem 0;
    border-top: 4px solid ${colors.ink90};
    border-bottom: 4px solid ${colors.ink90};
    font-size: 1.25rem;
    font-weight: 300;

    @media (min-width: ${getEmSize(pxSizes.breakpoints.sm)}) {
      width: 75%;
      font-size: 1.5rem;
    }
  }

  .message {
    margin-bottom: 1rem;
    padding: 1rem;
    color: ${lighten(0.25, colors.grey90)};
    background-color: ${darken(0.05, colors.white)};

    p:last-child {
      margin-bottom: 0;
    }
  }

  a[href^='#fn-'],
  a[href^='#fnref-'] {
    display: inline-block;
    margin-left: 0.1rem;
    font-weight: bold;
  }

  .footnotes {
    margin-top: 2rem;
    font-size: 85%;

    li[id^='fn-'] {
      p {
        // Remark for some reason puts the footnote reflink *after* the 'p' tag.
        display: inline;
      }
    }
  }

  .lead {
    font-size: 1.25rem;
    font-weight: 300;

    @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
      font-size: 1.5rem;
    }
  }
`
