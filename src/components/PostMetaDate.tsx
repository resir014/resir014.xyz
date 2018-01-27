import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../utils/theme'
import { sectionHeading } from '../utils/globalStyles'

interface PostMetaDateProps {
  className?: string
}

const PostMetaDate: React.SFC<PostMetaDateProps> = ({ className, children }) => (
  <span className={className}>{children}</span>
)

export default styled(PostMetaDate)`
  ${sectionHeading(colors.white, 0, '.5rem')}
`
