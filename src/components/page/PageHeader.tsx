import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { getEmSize } from '../../styles/mixins'
import { pxSizes, colors, layerShadows } from '../../styles/variables'
import Container from '../ui/Container'
import { space } from '../chungking-core'

interface PageHeaderProps {
  className?: string
  hasImage?: boolean
  metaItem?: React.ReactNode
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const PageHeader: React.SFC<PageHeaderProps> = ({
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

export default PageHeader

PageHeader.defaultProps = {
  className: undefined,
  hasImage: false,
  size: 'md'
}

const HeaderDivider = styled('hr')`
  width: 100%;
  max-width: 100px;
  height: 8px;
  margin-top: 0;
  margin-bottom: ${space.sm}px;
  border: none;
  border-radius: 8px;
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
    box-shadow: ${layerShadows.double};
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
