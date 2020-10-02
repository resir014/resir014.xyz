import styled from '@emotion/styled'
import { colors, space } from '../chungking-core'

const HeaderDivider = styled('hr')`
  width: 100%;
  max-width: 100px;
  height: 6px;
  margin-top: 0;
  margin-bottom: ${space.md}px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(to right, ${colors.blue30}, ${colors.magenta30});
`

export default HeaderDivider
