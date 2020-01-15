import styled from '@emotion/styled'
import { colors, shadows, space } from '../chungking-core'

const PostIndexItem = styled('div')`
  margin-bottom: ${space.xxl}px;
  padding: ${space.md}px ${space.lg}px;
  background-color: ${colors.grey90};
  border-radius: 6px;
  box-shadow: ${shadows.single};
`

export default PostIndexItem
