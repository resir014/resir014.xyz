import * as React from 'react'
import styled from '@emotion/styled'
import { ButtonBase, ButtonVariants } from './styled'
import { ButtonBaseProps, ButtonProps } from './types'

const Root = styled('button')<ButtonBaseProps>`
  ${ButtonBase}
  ${ButtonVariants}
`

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { id, className, style, disabled, children, type = 'button', variant = 'secondary', size = 'md', ...rest },
  ref
) => {
  return (
    <Root id={id} ref={ref} type={type} className={className} style={style} disabled={disabled} variant={variant} size={size} {...rest}>
      {children}
    </Root>
  )
}

export default React.forwardRef(Button)
