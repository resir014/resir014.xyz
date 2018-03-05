import * as React from 'react'
import styled from 'styled-components'

import { emSizes, colors } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface HomepageLanguageListItemProps {
  className?: string
  color?: string
  background: string
  name: string
}

const HomepageLanguageListItem: React.SFC<HomepageLanguageListItemProps> = ({ name, className }) => (
  <div className={className}>
    <span>{name}</span>
  </div>
)

export default styled(HomepageLanguageListItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  margin-bottom: 1rem;
  padding: ${emSizes.containerPadding}rem;
  border-radius: 3px;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.color || colors.grey90};
  background-color: ${props => props.background || colors.grey20};

  ${media.md`
    width: 200px;
    height: 200px;
  `}
`
