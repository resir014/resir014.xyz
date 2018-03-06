import * as React from 'react'
import styled from 'styled-components'

import { emSizes } from '../../styles/variables'
import { media } from '../../styles/mixins'
import { ProjectField } from '../../utils/types'

import FeaturedProject from '../projects/FeaturedProject'

const StyledHomepageFeaturedProject = styled(FeaturedProject)`
  padding: 1.5rem 0;
`

interface HomepageFeaturedProject extends ProjectField {
  className?: string
}

const HomepageFeaturedProject: React.SFC<HomepageFeaturedProject> = ({
  node,
  className
}) => <StyledHomepageFeaturedProject className={className} node={node} />

export default HomepageFeaturedProject
