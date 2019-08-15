import * as React from 'react'
import styled from '@emotion/styled'
import convert from 'htmr'
import { HtmrOptions } from 'htmr/src/types'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import { colors, emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface MarkdownContentProps {
  className?: string
  html: string
}

const MarkdownContent: React.SFC<MarkdownContentProps> = ({ className, html }) => {
  const transform: HtmrOptions['transform'] = {
    a: (node: Partial<React.ReactHTMLElement<HTMLAnchorElement>['props']>) => {
      const { href } = node

      if (href && href.substr(0, 4) === 'http') {
        return <OutboundLink href={href}>{node.children}</OutboundLink>
      }

      if (href) {
        return <Link to={href}>{node.children}</Link>
      }

      return <a href={href}>{node.children}</a>
    }
  }

  return <Div className={className}>{convert(html, { transform })}</Div>
}

export default MarkdownContent

const Div = styled('div')`
  a {
    color: ${colors.green30};

    strong {
      color: inherit;
    }
  }

  .gatsby-resp-image-wrapper {
    margin: 1.5rem 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  figure {
    margin: 2rem 0;
    text-align: center;

    &:first-child {
      margin-top: 0;
    }

    @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
      margin-left: -${emSizes.containerPadding * 2}rem;
      margin-right: -${emSizes.containerPadding * 2}rem;
    }

    .gatsby-resp-image-wrapper {
      margin: 0 auto !important;
    }

    img {
      vertical-align: middle;
      margin-left: auto;
      margin-right: auto;
    }

    figcaption {
      &:last-child {
        padding-top: 8px;
      }
    }
  }

  ul,
  ol,
  dl {
    &:last-child {
      margin-bottom: 0;
    }
  }

  li {
    p {
      &:last-of-type {
        margin-bottom: 0.5rem;
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

  .message {
    position: relative;
    margin: 1.5rem 0;
    padding: 1rem;
    border: 2px solid transparent;
    border-image-source: linear-gradient(to right, ${colors.magenta30}, ${colors.orange30});
    border-image-slice: 1;

    &:first-child {
      margin-top: 0;
    }

    a {
      color: ${colors.orange30};
    }

    p,
    ul,
    ol {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  a[href^='#fn-'],
  a[href^='#fnref-'] {
    display: inline-block;
    margin-left: 0.1rem;
    font-weight: bold;
  }

  hr {
    width: 100%;
    max-width: 100px;
    height: 6px;
    margin: 2.5rem auto;
    border: none;
    border-radius: 6px;
    background: linear-gradient(to right, ${colors.green30}, ${colors.orange30});
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
