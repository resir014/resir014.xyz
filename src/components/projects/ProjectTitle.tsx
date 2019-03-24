import styled from '@emotion/styled'

import { PageTitle } from '../page'
import { colors, emSizes, pxSizes } from '../../styles/variables'
import { getEmSize } from '../../styles/mixins'

const ProjectTitle = styled(PageTitle)`
  margin-top: 0;
  color: ${colors.green30};
  font-size: ${emSizes.headingSmall.h2}rem;
  line-height: ${emSizes.lineHeight.heading};

  @media (min-width: ${getEmSize(pxSizes.breakpoints.md)}) {
    font-size: ${emSizes.headingMedium.h2}rem;
  }

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: ${emSizes.headingLarge.h2}rem;
  }
`

export default ProjectTitle
