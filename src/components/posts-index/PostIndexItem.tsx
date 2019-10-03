import styled from '@emotion/styled'
import { colors, layerShadows, space } from '../chungking-core'

const PostIndexItem = styled('div')`
  margin-bottom: 3rem;
  padding: ${space.md}px ${space.lg}px;
  background-color: ${colors.grey90};
  border-radius: 6px;
  box-shadow: ${layerShadows.single};
`

export default PostIndexItem
