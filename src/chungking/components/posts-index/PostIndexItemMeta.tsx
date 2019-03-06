import styled from '@emotion/styled-base'
import { colors } from '../../styles/variables'

export const PostIndexItemMeta = styled('div')`
  font-size: 90%;
  letter-spacing: 0.01em;
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
