import * as React from 'react'
import styled from 'styled-components'
import { css } from 'glamor'

import { photonColors, fonts } from '../utils/theme'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  id?: string
  className?: string
  elem: React.ReactType
}

const Button: React.SFC<ButtonProps> = ({ id, className, elem, children, ...otherProps }) => {
  const Element = elem

  return (
    <Element id={id} className={className} {...otherProps}>
      {children}
    </Element>
  )
}

export default styled(Button)`
  display: inline-block;
  padding: .5rem 1rem;
  background: transparent;
  color: ${photonColors.grey70};
  border: 2px solid ${photonColors.grey70};
  font-family: ${fonts.sansSerif};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, .25)
  }
`
