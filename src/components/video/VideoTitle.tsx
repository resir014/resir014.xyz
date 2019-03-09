import styled from '@emotion/styled'
import { PageTitle } from '../page'
import { emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

const VideoTitle = styled(PageTitle)`
  margin-top: 0;
  padding: 1.5rem 1.5rem 0;
  font-size: ${emSizes.headingMedium.h3}rem;
  line-height: ${emSizes.lineHeight.heading};

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: ${emSizes.headingMedium.h3}rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h3}rem;
  }
`

export default VideoTitle
