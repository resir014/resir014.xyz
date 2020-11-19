import * as React from 'react'
import { css } from '@emotion/core'
import Image from 'next/image'
import Link from 'next/link'
import { HtmrOptions } from 'htmr/src/types'

import { Anchor, Box, BoxProps, ResponsiveIframe, MessageBox, ResponsiveWrapper } from '~/components/chungking-core'
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
  hr: (node: Partial<React.ReactHTMLElement<HTMLHRElement>['props'] & Pick<BoxProps, 'mt' | 'mb'>>) => {
    const { mt: _mt, mb: _mb, ...rest } = node
    return <Box as="hr" {...rest} />
  },
  blockquote: Blockquote,
  pre: CodeBlock,
  code: InlineCode,
  img: (node: JSX.IntrinsicElements['img']) => {
    const { className, src, alt, crossOrigin, ...rest } = node

    if (className?.includes('is-inline')) {
      return (
        <img
          loading="lazy"
          className={className}
          src={src}
          alt={alt?.toString()}
          crossOrigin={crossOrigin}
          css={css`
            display: inline-block;
            margin: 0;
          `}
          {...rest}
        />
      )
    }

    if (src) {
      if (src.substr(0, 4) === 'http') {
        return <img loading="lazy" className={className} src={src} alt={alt?.toString()} crossOrigin={crossOrigin} {...rest} />
      }

      return (
        <Image
          loading="lazy"
          className={className}
          src={src}
          alt={alt?.toString()}
          crossOrigin={crossOrigin}
          unoptimized
          unsized
          {...rest}
        />
      )
    }

    return null
  },
  figure: (node: Partial<React.ReactHTMLElement<HTMLElement>['props'] & Pick<BoxProps, 'mt' | 'mb'>>) => {
    const { mt: _mt, mb: _mb, ...rest } = node
    return <Figure {...rest} />
  },
  iframe: (node: Partial<React.ReactHTMLElement<HTMLIFrameElement>['props'] & Pick<BoxProps, 'mt' | 'mb'>>) => {
    const { title, mt: _mt, mb: _mb, allowFullScreen: _allowFullScreen, ...rest } = node
    return (
      <ResponsiveWrapper my="xl" mx={[null, null, null, null, -48]} borderRadius={6} boxShadow="single" overflow="hidden">
        <ResponsiveIframe title={title} allowFullScreen {...rest} />
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
  a: (node: JSX.IntrinsicElements['a']) => {
    const { href } = node

    if (href) {
      if (href.substr(0, 4) === 'http') {
        return (
          <Anchor href={href} target="_blank" rel="noopener noreferrer">
            {node.children}
          </Anchor>
        )
      }

      return (
        <Link href={href} passHref>
          <Anchor>{node.children}</Anchor>
        </Link>
      )
    }

    return <Anchor href={href}>{node.children}</Anchor>
  }
}

export default htmrTransform
