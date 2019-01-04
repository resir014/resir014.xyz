import * as React from 'react'
import styled from '@emotion/styled'

import { emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

const StyledHomepageContent = styled('div')`
  display: block;
  padding: ${emSizes.containerPadding}rem;
  padding-bottom: 3rem;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    margin-top: ${(props: HomepageContentProps) => (props.withHomepageFlavour ? '3rem' : 0)};
  }
`

interface HomepageContentProps {
  className?: string
  withHomepageFlavour?: boolean
}

const HomepageContent: React.SFC<HomepageContentProps> = ({
  children,
  className,
  withHomepageFlavour
}) => (
  <StyledHomepageContent className={className} withHomepageFlavour={withHomepageFlavour}>
    {children}
  </StyledHomepageContent>
)

export default HomepageContent
