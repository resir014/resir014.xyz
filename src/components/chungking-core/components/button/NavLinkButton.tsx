import * as React from 'react'
import styled from '@emotion/styled'
import classnames from 'clsx'
import { Link, GatsbyLinkProps } from 'gatsby'

import { ButtonBase, ButtonBaseProps } from './Button'

type NavLinkButtonProps = ButtonBaseProps & Omit<GatsbyLinkProps<{}>, 'ref'>

const Root = styled(Link)<ButtonBaseProps>(ButtonBase)

const NavLinkButton: React.SFC<NavLinkButtonProps> = ({
  id,
  className,
  style,
  to,
  disabled,
  children,
  ...rest
}) => {
  return (
    <Root
      id={id}
      className={classnames(className, disabled && 'disabled')}
      style={style}
      to={to}
      {...rest}
    >
      {children}
    </Root>
  )
}

NavLinkButton.defaultProps = {
  color: 'secondary',
  size: 'md'
}

export default NavLinkButton
