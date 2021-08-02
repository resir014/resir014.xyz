import * as React from 'react'
import { css } from '@emotion/react'

import { Paragraph, ParagraphProps, Text, TextProps, Box, BoxProps, Stack, theme } from '@resir014/chungking-react'

interface WithStylesProps {
  className?: string
  style?: React.CSSProperties
}

export const P: React.FC<WithStylesProps & ParagraphProps> = ({ children, ...rest }) => <Paragraph {...rest}>{children}</Paragraph>

export const Small: React.FC<WithStylesProps & TextProps> = ({ children, ...rest }) => (
  <Text fontSize="sm" {...rest}>
    {children}
  </Text>
)

const UnorderedListStyles = css`
  display: block;
  list-style-type: none;

  > li::before {
    content: '–';
    display: inline-block;
    color: ${theme.colors.grey[300]};
    position: absolute;
    margin-left: -15px;
  }
`

const OrderedListStyles = css`
  display: block;
  list-style-type: decimal;
`

const BlockquoteStyles = css`
  padding: 0;
  padding-right: ${theme.space.md}px;
  padding-left: ${theme.space.sm}px;
  color: ${theme.colors.grey[200]};
  border-left: 1px solid ${theme.colors.white};

  &:first-child {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
`

const CodeBlockStyles = css`
  overflow: auto;
`

const InlineCodeStyles = css`
  padding: 0.125rem 0.25rem;
  font-size: 90%;
  color: ${theme.colors.magenta[400]};
  background-color: #1d1f21;
  border-radius: 3px;
`

const FigureStyles = css`
  img {
    margin: 0 auto;
    border-radius: 6px;
    box-shadow: ${theme.shadows.single};
    vertical-align: middle;
    background-color: ${theme.colors.grey[900]};
  }

  figcaption:not(:first-child) {
    margin-top: 8px;
  }
`

export const UL: React.FC<WithStylesProps & TextProps> = ({ children, ...rest }) => (
  <Stack as="ul" css={UnorderedListStyles} spacing="sm" ml="md" mr="sm" p={0} {...rest}>
    {children}
  </Stack>
)

export const OL: React.FC<WithStylesProps & TextProps> = ({ children, ...rest }) => (
  <Stack as="ol" css={OrderedListStyles} spacing="sm" ml="md" mr="sm" p={0} {...rest}>
    {children}
  </Stack>
)

export const LI: React.FC<WithStylesProps & TextProps> = ({ children, ...rest }) => (
  <Text as="li" mt={0} {...rest}>
    {children}
  </Text>
)

export const Blockquote: React.FC<WithStylesProps & BoxProps> = ({ children, ...rest }) => (
  <Box as="blockquote" css={BlockquoteStyles} {...rest}>
    {children}
  </Box>
)

export const CodeBlock: React.FC<WithStylesProps & BoxProps> = ({ children, mt: _mt, mb: _mb, ...rest }) => (
  <Box
    as="pre"
    p="md"
    borderRadius={6}
    mx={[null, null, null, null, -48]}
    css={CodeBlockStyles}
    backgroundColor="#1d1f21"
    my="xl"
    boxShadow="single"
    overflow="hidden"
    {...rest}
  >
    {children}
  </Box>
)

export const InlineCode: React.FC<WithStylesProps & TextProps> = ({ children, ...rest }) => (
  <Text as="code" css={InlineCodeStyles} {...rest}>
    {children}
  </Text>
)

export const Figure: React.FC<WithStylesProps & BoxProps> = ({ children, ...rest }) => (
  <Box as="figure" my="xl" mx={[null, null, null, null, -48]} css={FigureStyles} textAlign="center" {...rest}>
    {children}
  </Box>
)

export const Figcaption: React.FC<WithStylesProps & TextProps> = ({ children, ...rest }) => (
  <Text as="figcaption" fontSize="sm" {...rest}>
    {children}
  </Text>
)
