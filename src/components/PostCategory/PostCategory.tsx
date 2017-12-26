import * as React from 'react'
import styled, { css } from 'styled-components'
import { photonColors } from '../../utils/theme'

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
  color: ${photonColors.white};
  background-color: ${photonColors.grey90};
  box-decoration-break: clone;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  ${props => props.category === 'blog' && css`
    background-color: ${photonColors.teal70};
  `}

  ${props => props.category === 'bits' && css`
    background-color: ${photonColors.yellow70};
  `}

  ${props => props.category === 'tv' && css`
    background-color: ${photonColors.green70};
  `}
`
