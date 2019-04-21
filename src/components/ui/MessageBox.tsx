import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { colors } from '../../styles/variables'

interface MessageBoxProps {
  className?: string
  variant?: 'default' | 'warning' | 'info'
}

const DefaultStyles = css`
  border-color: ${colors.green30};

  a {
    color: ${colors.green30};
  }
`

const WarningStyles = css`
  border-color: ${colors.orange30};

  a {
    color: ${colors.orange30};
  }
`

const InfoStyles = css`
  border-color: ${colors.blue30};

  a {
    color: ${colors.blue30};
  }
`

const Root = styled<'div', MessageBoxProps>('div')`
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid ${colors.green30};
  border-radius: 6px;

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
  ${props => props.variant === 'info' && InfoStyles}
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
