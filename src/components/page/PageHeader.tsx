import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import Container from '../ui/Container'
import { space, colors, breakpoints, layerShadows } from '../chungking-core'

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

const HasImageStyles = css`
  padding: 24px 24px 0;

  @media (min-width: ${breakpoints.md}px) {
    padding: 24px ${space.md}px 0;
  }

  @media (min-width: ${breakpoints.lg}px) {
    position: absolute;
    bottom: 24px;
    left: 24px;
    max-width: 85%;
    padding: 24px;
    background: linear-gradient(to right, ${colors.blue30}, ${colors.green30});
    border-radius: 8px;
    box-shadow: ${layerShadows.double};
  }
`

const Section = styled<'section', PageHeaderProps>('section')`
  padding: ${space.xxl}px 24px 0;
  z-index: 5;

  ${props => props.hasImage && HasImageStyles}
`
