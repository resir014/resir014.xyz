import * as React from 'react'
import styled from 'react-emotion'

import { ProjectField } from '../../types/fields'

import FeaturedProject from '../projects/FeaturedProject'

const StyledHomepageFeaturedProject = styled(FeaturedProject)`
  padding: 1.5rem 0;
`

interface HomepageFeaturedProject extends ProjectField {
  className?: string
}

const HomepageFeaturedProject: React.SFC<HomepageFeaturedProject> = ({ node, className }) => (
  <StyledHomepageFeaturedProject className={className} node={node} />
)

export default HomepageFeaturedProject
