import * as React from 'react'
import styled from '@emotion/styled'

import { getEmSize } from '../../styles/mixins'
import { pxSizes, colors } from '../../styles/variables'
import Container from '../ui/Container'
import css from '@emotion/css'

interface PageHeaderProps {
  className?: string
  hasImage?: boolean
  metaItem?: React.ReactNode
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

export const PageHeader: React.SFC<PageHeaderProps> = ({
  className,
  children,
  hasImage,
  metaItem,
  size
}) => (
  <Section className={className} hasImage={hasImage}>
    <Container size={size}>
      <HeaderDivider />
      {metaItem}
      {children}
    </Container>
  </Section>
)

PageHeader.defaultProps = {
  className: undefined,
  hasImage: false,
  size: 'md'
}

const HeaderDivider = styled('hr')`
  width: 100%;
  max-width: 100px;
  height: 6px;
  margin-top: 0;
  margin-bottom: 1rem;
  border: none;
  border-radius: 6px;
  background: linear-gradient(to right, ${colors.blue30}, ${colors.magenta30});
`

const HasImageStyles = css`
  padding: 1.5rem 1.5rem 0;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    padding: 1.5rem 1rem 0;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    max-width: 85%;
    padding: 1.5rem;
    background: linear-gradient(to right, ${colors.blue30}, ${colors.green30});
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 8px 16px 0;
  }
`

const Section = styled<'section', PageHeaderProps>('section')`
  padding: 3rem 1.5rem 0;
  z-index: 5;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: 18px;
  }

  ${props => props.hasImage && HasImageStyles}
`
