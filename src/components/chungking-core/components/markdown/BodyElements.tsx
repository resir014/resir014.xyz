import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Paragraph, Text } from '../../foundations'
import { colors } from '../../utils'

interface WithStylesProps {
  className?: string
  style?: React.CSSProperties
}

export const P: React.FC<WithStylesProps> = ({ children, ...rest }) => (
  <Paragraph {...rest}>{children}</Paragraph>
)

const UnorderedListStyles = css`
  display: block;
  list-style-type: none;

  &:last-child {
    margin-bottom: 0;
  }

  > li::before {
    content: '–';
    display: inline-block;
    color: ${colors.grey40};
    position: absolute;
    margin-left: -15px;
  }
`

const OrderedListStyles = css`
  display: block;
  list-style-type: decimal;

  &:last-child {
    margin-bottom: 0;
  }
`

const ListItemStyles = css`
  &:last-child {
    margin-bottom: 0;
  }
`

export const UL: React.FC<WithStylesProps> = ({ children, ...rest }) => (
  <Text as="ul" css={UnorderedListStyles} m="sm" ml="md" p={0} {...rest}>
    {children}
  </Text>
)

export const OL: React.FC<WithStylesProps> = ({ children, ...rest }) => (
  <Text as="ol" css={OrderedListStyles} m="sm" ml="md" p={0} {...rest}>
    {children}
  </Text>
)

export const LI: React.FC<WithStylesProps> = ({ children, ...rest }) => (
  <Text as="li" css={ListItemStyles} mt={0} mb="sm" {...rest}>
    {children}
  </Text>
)

export const InlineCode = styled('code')`
  padding: 0.125rem 0.25rem;
  font-size: 90%;
  color: ${colors.magenta30};
  background-color: #1d1f21;
  border-radius: 3px;
`
