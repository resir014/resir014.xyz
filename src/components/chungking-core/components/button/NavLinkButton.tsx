import * as React from 'react'
import styled from '@emotion/styled'
import classnames from 'clsx'
import { Link, GatsbyLinkProps } from 'gatsby'

import { ButtonBaseProps } from './types'
import { ButtonBase } from './styled'

type NavLinkButtonProps = ButtonBaseProps & Omit<GatsbyLinkProps<{}>, 'ref'>

const Root = styled(Link)<ButtonBaseProps>(ButtonBase)

const NavLinkButton: React.SFC<NavLinkButtonProps> = ({
  id,
  className,
  style,
  to,
  disabled,
  children,
  variant: color = 'secondary',
  size = 'md',
  ...rest
}) => {
  return (
    <Root
      id={id}
      className={classnames(className, disabled && 'disabled')}
      style={style}
      to={to}
      variant={color}
      size={size}
      {...rest}
    >
      {children}
    </Root>
  )
}

export default NavLinkButton
