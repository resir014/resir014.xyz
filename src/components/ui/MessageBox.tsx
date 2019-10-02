import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colors } from '../chungking-core'

interface MessageBoxProps {
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

const Root = styled<'div', MessageBoxProps>('div')`
  margin: 1.5rem 0;
  padding: 1rem;
  border: 2px solid transparent;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${colors.green30};
  }

  p,
  ul,
  ol {
    &:last-child {
      margin-bottom: 0;
    }
  }

  ${props => props.variant === 'default' && DefaultStyles}
  ${props => props.variant === 'warning' && WarningStyles}
`

const MessageBox: React.SFC<MessageBoxProps> = ({ className, children, ...rest }) => (
  <Root className={className} {...rest}>
    {children}
  </Root>
)

MessageBox.defaultProps = {
  className: undefined,
  variant: 'default'
}

export default MessageBox
