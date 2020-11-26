import { css } from '@emotion/core'
import * as React from 'react'
import { Stack, StackProps } from '@resir014/chungking-react'

type LinktreeListProps = StackProps

const LinktreeList: React.FC<LinktreeListProps> = ({ className, style, children, ...rest }) => {
  return (
    <Stack
      as="ul"
      spacing="md"
      p={0}
      css={css`
        list-style-type: none;
      `}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Stack>
  )
}

export default LinktreeList
