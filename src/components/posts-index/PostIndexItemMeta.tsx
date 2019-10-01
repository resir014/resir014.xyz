import styled from '@emotion/styled'
import { colors } from '../../styles/variables'

const PostIndexItemMeta = styled('div')`
  text-transform: uppercase;

  hr {
    width: 100%;
    max-width: 100px;
    height: 6px;
    margin: 0.5rem 0 0;
    border: none;
    border-bottom: 2px solid ${colors.orange30};
  }
`

export default PostIndexItemMeta
