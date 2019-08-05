import * as React from 'react'
import styled from '@emotion/styled'
import classnames from 'classnames'

import { ButtonBase, ButtonBaseProps } from './Button'

type AnchorButtonProps = ButtonBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

const Root = styled('a')<ButtonBaseProps>(ButtonBase)

const AnchorButton: React.SFC<AnchorButtonProps> = ({
  id,
  className,
  style,
  disabled,
  children,
  ...rest
}) => {
  return (
    <Root id={id} className={classnames(className, disabled && 'disabled')} style={style} {...rest}>
      {children}
    </Root>
  )
}

AnchorButton.defaultProps = {
  color: 'secondary',
  size: 'md'
}

export default AnchorButton
