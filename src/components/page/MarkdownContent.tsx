import * as React from 'react'
import styled from '@emotion/styled'
import convert from 'htmr'
import { HtmrOptions } from 'htmr/src/types'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  UL,
  OL,
  LI,
  Blockquote,
  InlineCode,
  space,
  mediaQueries,
  colors,
  Stack
} from '../chungking-core'

interface MarkdownContentProps {
  className?: string
  html: string
}

const MarkdownContent: React.SFC<MarkdownContentProps> = ({ className, html }) => {
  const transform: HtmrOptions['transform'] = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: P,
    ul: UL,
    ol: OL,
    li: LI,
    blockquote: Blockquote,
    code: InlineCode,
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

  return (
    <Div spacing="md" className={className}>
      {convert(html, { transform })}
    </Div>
  )
}

export default MarkdownContent

const Div = styled(Stack)`
  a {
    color: ${colors.green30};

    strong {
      color: inherit;
    }
  }

  .gatsby-resp-image-wrapper {
    margin: 24px 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  figure {
    margin: ${space.xl}px 0;
    text-align: center;

    &:first-child {
      margin-top: 0;
    }

    ${mediaQueries.lg} {
      margin-left: -${space.lg * 2}px;
      margin-right: -${space.lg * 2}px;
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
        margin-bottom: ${space.xs}px;
      }
    }
  }

  .gatsby-highlight {
    margin: ${space.md}px 0;
    font-size: 90%;
  }

  *:not(pre) > code[class*='language-'] {
    padding: 0.125rem 0.25rem;
    font-size: 90%;
    border-radius: 3px;
  }

  .message {
    position: relative;
    padding: ${space.md}px;
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
    position: relative;
    margin: ${space.xl}px 0;
    border: 0;
    border-bottom: 1px solid ${colors.grey80};
  }

  .footnotes {
    margin-top: ${space.xl}px;
    font-size: 85%;

    li[id^='fn-'] {
      p {
        /* Remark for some reason puts the footnote reflink *after* the 'p' tag. */
        display: inline;
      }
    }
  }
`
