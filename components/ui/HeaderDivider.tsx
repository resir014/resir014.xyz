import styled from '@emotion/styled'
import { theme } from '@resir014/chungking-react'

const HeaderDivider = styled('hr')`
  width: 100%;
  max-width: 100px;
  height: 6px;
  margin-top: 0;
  margin-bottom: ${theme.space.md}px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(to right, ${theme.colors.blue[500]}, ${theme.colors.magenta[400]});
`

export default HeaderDivider
