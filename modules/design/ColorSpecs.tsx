import * as React from 'react'
import { colors } from '~/components/chungking-core'
import { H2, H3 } from '../markdown'
import ColorSwatch from './components/ColorSwatch'

const ColorSpecs: React.FC = () => {
  return (
    <>
      <H2>Colors</H2>
      <H3>Neutrals</H3>
      <ColorSwatch color={colors.black} />
      <ColorSwatch color={colors.white} darkText />
      <H3>Grey</H3>
      <ColorSwatch color={colors.grey[50]} darkText />
      <ColorSwatch color={colors.grey[100]} darkText />
      <ColorSwatch color={colors.grey[200]} darkText />
      <ColorSwatch color={colors.grey[300]} darkText />
      <ColorSwatch color={colors.grey[400]} darkText />
      <ColorSwatch color={colors.grey[500]} />
      <ColorSwatch color={colors.grey[600]} />
      <ColorSwatch color={colors.grey[700]} />
      <ColorSwatch color={colors.grey[800]} />
      <ColorSwatch color={colors.grey[900]} />
      <H3>Red</H3>
      <ColorSwatch color={colors.red[50]} darkText />
      <ColorSwatch color={colors.red[100]} darkText />
      <ColorSwatch color={colors.red[200]} darkText />
      <ColorSwatch color={colors.red[300]} darkText />
      <ColorSwatch color={colors.red[400]} darkText />
      <ColorSwatch color={colors.red[500]} darkText />
      <ColorSwatch color={colors.red[600]} darkText />
      <ColorSwatch color={colors.red[700]} />
      <ColorSwatch color={colors.red[800]} />
      <ColorSwatch color={colors.red[900]} />
      <H3>Orange</H3>
      <ColorSwatch color={colors.orange[50]} darkText />
      <ColorSwatch color={colors.orange[100]} darkText />
      <ColorSwatch color={colors.orange[200]} darkText />
      <ColorSwatch color={colors.orange[300]} darkText />
      <ColorSwatch color={colors.orange[400]} darkText />
      <ColorSwatch color={colors.orange[500]} darkText />
      <ColorSwatch color={colors.orange[600]} darkText />
      <ColorSwatch color={colors.orange[700]} />
      <ColorSwatch color={colors.orange[800]} />
      <ColorSwatch color={colors.orange[900]} />
      <H3>Green</H3>
      <ColorSwatch color={colors.green[50]} darkText />
      <ColorSwatch color={colors.green[100]} darkText />
      <ColorSwatch color={colors.green[200]} darkText />
      <ColorSwatch color={colors.green[300]} darkText />
      <ColorSwatch color={colors.green[400]} darkText />
      <ColorSwatch color={colors.green[500]} />
      <ColorSwatch color={colors.green[600]} />
      <ColorSwatch color={colors.green[700]} />
      <ColorSwatch color={colors.green[800]} />
      <ColorSwatch color={colors.green[900]} />
      <H3>Turquoise</H3>
      <ColorSwatch color={colors.turquoise[50]} darkText />
      <ColorSwatch color={colors.turquoise[100]} darkText />
      <ColorSwatch color={colors.turquoise[200]} darkText />
      <ColorSwatch color={colors.turquoise[300]} darkText />
      <ColorSwatch color={colors.turquoise[400]} darkText />
      <ColorSwatch color={colors.turquoise[500]} />
      <ColorSwatch color={colors.turquoise[600]} />
      <ColorSwatch color={colors.turquoise[700]} />
      <ColorSwatch color={colors.turquoise[800]} />
      <ColorSwatch color={colors.turquoise[900]} />
      <H3>Blue</H3>
      <ColorSwatch color={colors.blue[50]} darkText />
      <ColorSwatch color={colors.blue[100]} darkText />
      <ColorSwatch color={colors.blue[200]} darkText />
      <ColorSwatch color={colors.blue[300]} />
      <ColorSwatch color={colors.blue[400]} />
      <ColorSwatch color={colors.blue[500]} />
      <ColorSwatch color={colors.blue[600]} />
      <ColorSwatch color={colors.blue[700]} />
      <ColorSwatch color={colors.blue[800]} />
      <ColorSwatch color={colors.blue[900]} />
      <H3>Ultramarine</H3>
      <ColorSwatch color={colors.ultramarine[50]} darkText />
      <ColorSwatch color={colors.ultramarine[100]} darkText />
      <ColorSwatch color={colors.ultramarine[200]} darkText />
      <ColorSwatch color={colors.ultramarine[300]} />
      <ColorSwatch color={colors.ultramarine[400]} />
      <ColorSwatch color={colors.ultramarine[500]} />
      <ColorSwatch color={colors.ultramarine[600]} />
      <ColorSwatch color={colors.ultramarine[700]} />
      <ColorSwatch color={colors.ultramarine[800]} />
      <ColorSwatch color={colors.ultramarine[900]} />
      <H3>Purple</H3>
      <ColorSwatch color={colors.purple[50]} darkText />
      <ColorSwatch color={colors.purple[100]} darkText />
      <ColorSwatch color={colors.purple[200]} darkText />
      <ColorSwatch color={colors.purple[300]} darkText />
      <ColorSwatch color={colors.purple[400]} />
      <ColorSwatch color={colors.purple[500]} />
      <ColorSwatch color={colors.purple[600]} />
      <ColorSwatch color={colors.purple[700]} />
      <ColorSwatch color={colors.purple[800]} />
      <ColorSwatch color={colors.purple[900]} />
      <H3>Magenta</H3>
      <ColorSwatch color={colors.magenta[50]} darkText />
      <ColorSwatch color={colors.magenta[100]} darkText />
      <ColorSwatch color={colors.magenta[200]} darkText />
      <ColorSwatch color={colors.magenta[300]} darkText />
      <ColorSwatch color={colors.magenta[400]} darkText />
      <ColorSwatch color={colors.magenta[500]} darkText />
      <ColorSwatch color={colors.magenta[600]} darkText />
      <ColorSwatch color={colors.magenta[700]} />
      <ColorSwatch color={colors.magenta[800]} />
      <ColorSwatch color={colors.magenta[900]} />
    </>
  )
}

export default ColorSpecs
