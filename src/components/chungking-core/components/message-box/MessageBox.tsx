import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colors, space } from '../../utils'
import { Stack, StackProps } from '../../foundations'

export interface MessageBoxProps extends StackProps {
  className?: string
  variant?: 'default' | 'warning'
}

const DefaultStyles = css`
  border-image-source: linear-gradient(to right, ${colors.blue30}, ${colors.green30});
  border-image-slice: 1;

  a {
    color: ${colors.green30};
  }
`

const WarningStyles = css`
  border-image-source: linear-gradient(to right, ${colors.red30}, ${colors.orange30});
  border-image-slice: 1;

  a {
    color: ${colors.orange30};
  }
`

const Root = styled(Stack)<MessageBoxProps>`
  margin: 24px 0;
  padding: ${space.md}px;
  border: 2px solid transparent;

  a {
    color: ${colors.green30};
  }

  ${props => props.variant === 'default' && DefaultStyles}
  ${props => props.variant === 'warning' && WarningStyles}
`

const MessageBox: React.FC<MessageBoxProps> = ({ className, children, ...rest }) => (
  <Root className={className} spacing="md" {...rest}>
    {children}
  </Root>
)

MessageBox.defaultProps = {
  className: undefined,
  variant: 'default'
}

export default MessageBox
