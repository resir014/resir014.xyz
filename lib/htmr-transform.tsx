import * as React from 'react'
import { HtmrOptions } from 'htmr/src/types'

import { Anchor, BoxProps, Iframe, MessageBox, ResponsiveWrapper } from '~/components/chungking-core'
import { H1, H2, H3, H4, H5, H6, P, UL, OL, LI, Blockquote, InlineCode, CodeBlock, Figure } from '~/modules/markdown'

const htmrTransform: HtmrOptions['transform'] = {
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
  pre: CodeBlock,
  code: InlineCode,
  img: (node: Partial<React.ReactHTMLElement<HTMLImageElement>['props']>) => {
    const { alt, crossOrigin, ...rest } = node
    return <img loading="lazy" alt={alt?.toString()} crossOrigin={crossOrigin as any} {...rest} />
  },
  figure: (node: Partial<React.ReactHTMLElement<HTMLElement>['props'] & Pick<BoxProps, 'mt' | 'mb'>>) => {
    const { mt: _mt, mb: _mb, ...rest } = node
    return <Figure {...rest} />
  },
  iframe: (node: Partial<React.ReactHTMLElement<HTMLIFrameElement>['props'] & Pick<BoxProps, 'mt' | 'mb'>>) => {
    const { title, mt: _mt, mb: _mb, allowFullScreen: _allowFullScreen, ...rest } = node
    return (
      <ResponsiveWrapper my="xl" mx={[null, null, null, null, -48]} borderRadius={6} boxShadow="single" overflow="hidden">
        <Iframe title={title} allowFullScreen {...rest} />
      </ResponsiveWrapper>
    )
  },
  div: (node: Partial<React.ReactHTMLElement<HTMLDivElement>['props']> & Pick<BoxProps, 'mt' | 'mb'>) => {
    const { className: cn, children, ...rest } = node

    if (cn?.includes('message')) {
      if (cn?.includes('message--warning')) {
        return (
          <MessageBox variant="warning" {...rest}>
            {children}
          </MessageBox>
        )
      }

      return (
        <MessageBox variant="default" {...rest}>
          {children}
        </MessageBox>
      )
    }

    return <div {...rest}>{children}</div>
  },
  a: (node: Partial<React.ReactHTMLElement<HTMLAnchorElement>['props']>) => {
    const { href } = node

    if (href && href.substr(0, 4) === 'http') {
      return (
        <Anchor href={href} target="_blank" rel="noopener noreferrer">
          {node.children}
        </Anchor>
      )
    }

    return <Anchor href={href}>{node.children}</Anchor>
  }
}

export default htmrTransform
