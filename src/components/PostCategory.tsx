import * as React from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../utils/theme'

interface BlogCategoryProps {
  className?: string
  category?: string
}

const BlogCategory: React.SFC<BlogCategoryProps> = ({ className, children }) => (
  <span className={className}>
    {children}
  </span>
)

export default styled(BlogCategory)`
  display: inline-block;
  margin-left: .5rem;
  padding: 0 .25rem;
  color: ${colors.white};
  background-color: ${colors.grey90};
  box-decoration-break: clone;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  ${props => props.category === 'blog' && css`
    background-color: ${colors.teal70};
  `}

  ${props => props.category === 'bits' && css`
    background-color: ${colors.yellow70};
  `}

  ${props => props.category === 'tv' && css`
    background-color: ${colors.green70};
  `}
`
