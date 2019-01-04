import * as React from 'react'
import styled from '@emotion/styled'

import { emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

const StyledPageContent = styled('section')`
  display: block;
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    padding-top: 3rem;
    margin-top: ${(props: PageContentProps) => (props.hasHeaderImage ? '10rem' : 0)};
  }
`

interface PageContentProps {
  className?: string
  hasHeaderImage?: boolean
}

const PageContent: React.SFC<PageContentProps> = ({ children, className, hasHeaderImage }) => (
  <StyledPageContent className={className} hasHeaderImage={hasHeaderImage}>
    {children}
  </StyledPageContent>
)

export default PageContent
