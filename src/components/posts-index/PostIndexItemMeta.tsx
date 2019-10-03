import styled from '@emotion/styled'
import { colors, space } from '../chungking-core'

const PostIndexItemMeta = styled('div')`
  text-transform: uppercase;

  hr {
    width: 100%;
    max-width: 100px;
    margin: ${space.xs}px 0 0;
    border: none;
    border-bottom: 2px solid ${colors.orange30};
  }
`

export default PostIndexItemMeta
