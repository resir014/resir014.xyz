import * as React from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';
import { HtmrOptions } from 'htmr/src/types';

import { Anchor, Box, BoxProps, Iframe, MessageBox, AspectRatio } from '@resir014/chungking-react';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  MarkdownParagraph,
  UnorderedList,
  OrderedList,
  ListItem,
  Blockquote,
  InlineCode,
  CodeBlock,
  Figure,
  Figcaption,
} from '~/modules/markdown';

const HorizontalRule = Box.withComponent('hr');

const htmrTransform: HtmrOptions['transform'] = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: MarkdownParagraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  hr: (node: Partial<JSX.IntrinsicElements['hr'] & Pick<BoxProps, 'mt' | 'mb'>>) => {
    const { mt: _mt, mb: _mb, ...rest } = node;
    return <HorizontalRule my="xl" borderColor="grey.700" {...rest} />;
  },
  blockquote: Blockquote,
  pre: CodeBlock,
  code: InlineCode,
  img: (node: JSX.IntrinsicElements['img']) => {
    const { className, src, alt, crossOrigin, ...rest } = node;

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
      );
    }

    if (src) {
      return (
        <img
          loading="lazy"
          className={className}
          src={src}
          alt={alt?.toString()}
          crossOrigin={crossOrigin}
          {...rest}
        />
      );
    }

    return null;
  },
  figure: (
    node: Partial<React.ReactHTMLElement<HTMLElement>['props'] & Pick<BoxProps, 'mt' | 'mb'>>
  ) => {
    const { mt: _mt, mb: _mb, ...rest } = node;
    return <Figure {...rest} />;
  },
  figcaption: (
    node: Partial<React.ReactHTMLElement<HTMLElement>['props'] & Pick<BoxProps, 'mt' | 'mb'>>
  ) => {
    const { mt: _mt, mb: _mb, ...rest } = node;
    return <Figcaption {...rest} />;
  },
  iframe: (
    node: Partial<React.ReactHTMLElement<HTMLIFrameElement>['props'] & Pick<BoxProps, 'mt' | 'mb'>>
  ) => {
    const { title, mt: _mt, mb: _mb, allowFullScreen: _allowFullScreen, ...rest } = node;
    return (
      <AspectRatio
        ratio={16 / 9}
        my="xl"
        mx={[null, null, null, null, -48]}
        borderRadius={6}
        boxShadow="single"
        overflow="hidden"
      >
        <Iframe title={title} allowFullScreen {...rest} />
      </AspectRatio>
    );
  },
  div: (
    node: Partial<React.ReactHTMLElement<HTMLDivElement>['props']> & Pick<BoxProps, 'mt' | 'mb'>
  ) => {
    const { className: cn, children, ...rest } = node;

    if (cn?.includes('message')) {
      if (cn.includes('message--warning')) {
        return (
          <MessageBox variant="warning" {...rest}>
            {children}
          </MessageBox>
        );
      }

      return (
        <MessageBox variant="default" {...rest}>
          {children}
        </MessageBox>
      );
    }

    return <div {...rest}>{children}</div>;
  },
  a: (node: JSX.IntrinsicElements['a']) => {
    const { href, children } = node;

    if (href) {
      if (href.substr(0, 4) === 'http') {
        return (
          <Anchor href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </Anchor>
        );
      }

      return (
        <Link href={href} passHref>
          <Anchor>{children}</Anchor>
        </Link>
      );
    }

    return <Anchor href={href}>{children}</Anchor>;
  },
};

export default htmrTransform;
