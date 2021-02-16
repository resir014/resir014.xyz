import * as React from 'react'
import { theme } from '@resir014/chungking-react'
import { H2, H3 } from '../markdown'
import ColorSwatch from './components/ColorSwatch'

const ColorSpecs: React.FC = () => {
  return (
    <>
      <H2>Colors</H2>
      <H3>Neutrals</H3>
      <ColorSwatch color={theme.colors.black} />
      <ColorSwatch color={theme.colors.white} darkText />
      <H3>Grey</H3>
      <ColorSwatch color={theme.colors.grey[50]} darkText />
      <ColorSwatch color={theme.colors.grey[100]} darkText />
      <ColorSwatch color={theme.colors.grey[200]} darkText />
      <ColorSwatch color={theme.colors.grey[300]} darkText />
      <ColorSwatch color={theme.colors.grey[400]} darkText />
      <ColorSwatch color={theme.colors.grey[500]} />
      <ColorSwatch color={theme.colors.grey[600]} />
      <ColorSwatch color={theme.colors.grey[700]} />
      <ColorSwatch color={theme.colors.grey[800]} />
      <ColorSwatch color={theme.colors.grey[900]} />
      <H3>Red</H3>
      <ColorSwatch color={theme.colors.red[50]} darkText />
      <ColorSwatch color={theme.colors.red[100]} darkText />
      <ColorSwatch color={theme.colors.red[200]} darkText />
      <ColorSwatch color={theme.colors.red[300]} darkText />
      <ColorSwatch color={theme.colors.red[400]} darkText />
      <ColorSwatch color={theme.colors.red[500]} darkText />
      <ColorSwatch color={theme.colors.red[600]} darkText />
      <ColorSwatch color={theme.colors.red[700]} />
      <ColorSwatch color={theme.colors.red[800]} />
      <ColorSwatch color={theme.colors.red[900]} />
      <H3>Orange</H3>
      <ColorSwatch color={theme.colors.orange[50]} darkText />
      <ColorSwatch color={theme.colors.orange[100]} darkText />
      <ColorSwatch color={theme.colors.orange[200]} darkText />
      <ColorSwatch color={theme.colors.orange[300]} darkText />
      <ColorSwatch color={theme.colors.orange[400]} darkText />
      <ColorSwatch color={theme.colors.orange[500]} darkText />
      <ColorSwatch color={theme.colors.orange[600]} darkText />
      <ColorSwatch color={theme.colors.orange[700]} />
      <ColorSwatch color={theme.colors.orange[800]} />
      <ColorSwatch color={theme.colors.orange[900]} />
      <H3>Green</H3>
      <ColorSwatch color={theme.colors.green[50]} darkText />
      <ColorSwatch color={theme.colors.green[100]} darkText />
      <ColorSwatch color={theme.colors.green[200]} darkText />
      <ColorSwatch color={theme.colors.green[300]} darkText />
      <ColorSwatch color={theme.colors.green[400]} darkText />
      <ColorSwatch color={theme.colors.green[500]} />
      <ColorSwatch color={theme.colors.green[600]} />
      <ColorSwatch color={theme.colors.green[700]} />
      <ColorSwatch color={theme.colors.green[800]} />
      <ColorSwatch color={theme.colors.green[900]} />
      <H3>Turquoise</H3>
      <ColorSwatch color={theme.colors.turquoise[50]} darkText />
      <ColorSwatch color={theme.colors.turquoise[100]} darkText />
      <ColorSwatch color={theme.colors.turquoise[200]} darkText />
      <ColorSwatch color={theme.colors.turquoise[300]} darkText />
      <ColorSwatch color={theme.colors.turquoise[400]} darkText />
      <ColorSwatch color={theme.colors.turquoise[500]} />
      <ColorSwatch color={theme.colors.turquoise[600]} />
      <ColorSwatch color={theme.colors.turquoise[700]} />
      <ColorSwatch color={theme.colors.turquoise[800]} />
      <ColorSwatch color={theme.colors.turquoise[900]} />
      <H3>Blue</H3>
      <ColorSwatch color={theme.colors.blue[50]} darkText />
      <ColorSwatch color={theme.colors.blue[100]} darkText />
      <ColorSwatch color={theme.colors.blue[200]} darkText />
      <ColorSwatch color={theme.colors.blue[300]} />
      <ColorSwatch color={theme.colors.blue[400]} />
      <ColorSwatch color={theme.colors.blue[500]} />
      <ColorSwatch color={theme.colors.blue[600]} />
      <ColorSwatch color={theme.colors.blue[700]} />
      <ColorSwatch color={theme.colors.blue[800]} />
      <ColorSwatch color={theme.colors.blue[900]} />
      <H3>Ultramarine</H3>
      <ColorSwatch color={theme.colors.ultramarine[50]} darkText />
      <ColorSwatch color={theme.colors.ultramarine[100]} darkText />
      <ColorSwatch color={theme.colors.ultramarine[200]} darkText />
      <ColorSwatch color={theme.colors.ultramarine[300]} />
      <ColorSwatch color={theme.colors.ultramarine[400]} />
      <ColorSwatch color={theme.colors.ultramarine[500]} />
      <ColorSwatch color={theme.colors.ultramarine[600]} />
      <ColorSwatch color={theme.colors.ultramarine[700]} />
      <ColorSwatch color={theme.colors.ultramarine[800]} />
      <ColorSwatch color={theme.colors.ultramarine[900]} />
      <H3>Purple</H3>
      <ColorSwatch color={theme.colors.purple[50]} darkText />
      <ColorSwatch color={theme.colors.purple[100]} darkText />
      <ColorSwatch color={theme.colors.purple[200]} darkText />
      <ColorSwatch color={theme.colors.purple[300]} darkText />
      <ColorSwatch color={theme.colors.purple[400]} />
      <ColorSwatch color={theme.colors.purple[500]} />
      <ColorSwatch color={theme.colors.purple[600]} />
      <ColorSwatch color={theme.colors.purple[700]} />
      <ColorSwatch color={theme.colors.purple[800]} />
      <ColorSwatch color={theme.colors.purple[900]} />
      <H3>Magenta</H3>
      <ColorSwatch color={theme.colors.magenta[50]} darkText />
      <ColorSwatch color={theme.colors.magenta[100]} darkText />
      <ColorSwatch color={theme.colors.magenta[200]} darkText />
      <ColorSwatch color={theme.colors.magenta[300]} darkText />
      <ColorSwatch color={theme.colors.magenta[400]} darkText />
      <ColorSwatch color={theme.colors.magenta[500]} darkText />
      <ColorSwatch color={theme.colors.magenta[600]} darkText />
      <ColorSwatch color={theme.colors.magenta[700]} />
      <ColorSwatch color={theme.colors.magenta[800]} />
      <ColorSwatch color={theme.colors.magenta[900]} />
    </>
  )
}

export default ColorSpecs
