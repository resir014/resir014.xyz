import * as React from 'react'
import styled from 'react-emotion'

import { emSizes, colors, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

interface HomepageLanguageListItemProps {
  className?: string
  color?: string
  background: string
  name: string
}

const HomepageLanguageListItem: React.SFC<HomepageLanguageListItemProps> = ({
  name,
  color,
  background,
  className
}) => (
  <Div className={className} color={color} background={background}>
    <span>{name}</span>
  </Div>
)

interface WithColorProps {
  color?: string
  background: string
}

const Div = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  margin-bottom: 1rem;
  padding: ${emSizes.containerPadding}rem;
  border-radius: 3px;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props: WithColorProps) => props.color || colors.grey90};
  background-color: ${(props: WithColorProps) => props.background || colors.grey20};

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    width: 200px;
  }
`

export default HomepageLanguageListItem
