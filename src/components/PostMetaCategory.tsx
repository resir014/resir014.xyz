import * as React from 'react'
import styled from 'styled-components'

import { photonColors } from '../utils/theme'
import { sectionHeading } from '../utils/globalStyles'

interface PostMetaCategoryProps {
  className?: string
}

const PostMetaCategory: React.SFC<PostMetaCategoryProps> = ({ className, children }) => (
  <span className={className}>{children}</span>
)

export default styled(PostMetaCategory)`
  ${sectionHeading(photonColors.white, 0, '.5rem')}

  margin-left: .5rem !important;
`
