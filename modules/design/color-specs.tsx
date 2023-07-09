import * as React from 'react';
import { colors } from '@resir014/chungking-core';
import { ColorSwatch } from './color-swatch';
import { ColorSwatchGrid } from './color-swatch-container';

export const ColorSpecs: React.FC = () => {
  return (
    <>
      <h2>Colors</h2>
      <h3>Neutrals</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="black" color={colors.black} />
        <ColorSwatch title="white" color={colors.white} darkText />
      </ColorSwatchGrid>
      <h3>Grey</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="grey-50" color={colors.grey[50]} darkText />
        <ColorSwatch title="grey-100" color={colors.grey[100]} darkText />
        <ColorSwatch title="grey-200" color={colors.grey[200]} darkText />
        <ColorSwatch title="grey-300" color={colors.grey[300]} darkText />
        <ColorSwatch title="grey-400" color={colors.grey[400]} darkText />
        <ColorSwatch title="grey-500" color={colors.grey[500]} />
        <ColorSwatch title="grey-600" color={colors.grey[600]} />
        <ColorSwatch title="grey-700" color={colors.grey[700]} />
        <ColorSwatch title="grey-800" color={colors.grey[800]} />
        <ColorSwatch title="grey-900" color={colors.grey[800]} />
      </ColorSwatchGrid>
      <h3>Red</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="red-50" color={colors.red[50]} darkText />
        <ColorSwatch title="red-100" color={colors.red[100]} darkText />
        <ColorSwatch title="red-200" color={colors.red[200]} darkText />
        <ColorSwatch title="red-300" color={colors.red[300]} darkText />
        <ColorSwatch title="red-400" color={colors.red[400]} darkText />
        <ColorSwatch title="red-500" color={colors.red[500]} darkText />
        <ColorSwatch title="red-600" color={colors.red[600]} darkText />
        <ColorSwatch title="red-700" color={colors.red[700]} />
        <ColorSwatch title="red-800" color={colors.red[800]} />
        <ColorSwatch title="red-900" color={colors.red[900]} />
      </ColorSwatchGrid>
      <h3>Orange</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="orange-50" color={colors.orange[50]} darkText />
        <ColorSwatch title="orange-100" color={colors.orange[100]} darkText />
        <ColorSwatch title="orange-200" color={colors.orange[200]} darkText />
        <ColorSwatch title="orange-300" color={colors.orange[300]} darkText />
        <ColorSwatch title="orange-400" color={colors.orange[400]} darkText />
        <ColorSwatch title="orange-500" color={colors.orange[500]} darkText />
        <ColorSwatch title="orange-600" color={colors.orange[600]} darkText />
        <ColorSwatch title="orange-700" color={colors.orange[700]} />
        <ColorSwatch title="orange-800" color={colors.orange[800]} />
        <ColorSwatch title="orange-900" color={colors.orange[900]} />
      </ColorSwatchGrid>
      <h3>Green</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="green-50" color={colors.green[50]} darkText />
        <ColorSwatch title="green-100" color={colors.green[100]} darkText />
        <ColorSwatch title="green-200" color={colors.green[200]} darkText />
        <ColorSwatch title="green-300" color={colors.green[300]} darkText />
        <ColorSwatch title="green-400" color={colors.green[400]} darkText />
        <ColorSwatch title="green-500" color={colors.green[500]} />
        <ColorSwatch title="green-600" color={colors.green[600]} />
        <ColorSwatch title="green-700" color={colors.green[700]} />
        <ColorSwatch title="green-800" color={colors.green[800]} />
        <ColorSwatch title="green-900" color={colors.green[900]} />
      </ColorSwatchGrid>
      <h3>Turquoise</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="turquoise-50" color={colors.turquoise[50]} darkText />
        <ColorSwatch title="turquoise-100" color={colors.turquoise[100]} darkText />
        <ColorSwatch title="turquoise-200" color={colors.turquoise[200]} darkText />
        <ColorSwatch title="turquoise-300" color={colors.turquoise[300]} darkText />
        <ColorSwatch title="turquoise-400" color={colors.turquoise[400]} darkText />
        <ColorSwatch title="turquoise-500" color={colors.turquoise[500]} />
        <ColorSwatch title="turquoise-600" color={colors.turquoise[600]} />
        <ColorSwatch title="turquoise-700" color={colors.turquoise[700]} />
        <ColorSwatch title="turquoise-800" color={colors.turquoise[800]} />
        <ColorSwatch title="turquoise-900" color={colors.turquoise[900]} />
      </ColorSwatchGrid>
      <h3>Blue</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="blue-50" color={colors.blue[50]} darkText />
        <ColorSwatch title="blue-100" color={colors.blue[100]} darkText />
        <ColorSwatch title="blue-200" color={colors.blue[200]} darkText />
        <ColorSwatch title="blue-300" color={colors.blue[300]} />
        <ColorSwatch title="blue-400" color={colors.blue[400]} />
        <ColorSwatch title="blue-500" color={colors.blue[500]} />
        <ColorSwatch title="blue-600" color={colors.blue[600]} />
        <ColorSwatch title="blue-700" color={colors.blue[700]} />
        <ColorSwatch title="blue-800" color={colors.blue[800]} />
        <ColorSwatch title="blue-900" color={colors.blue[900]} />
      </ColorSwatchGrid>
      <h3>Ultramarine</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="ultramarine-50" color={colors.ultramarine[50]} darkText />
        <ColorSwatch title="ultramarine-100" color={colors.ultramarine[100]} darkText />
        <ColorSwatch title="ultramarine-200" color={colors.ultramarine[200]} darkText />
        <ColorSwatch title="ultramarine-300" color={colors.ultramarine[300]} />
        <ColorSwatch title="ultramarine-400" color={colors.ultramarine[400]} />
        <ColorSwatch title="ultramarine-500" color={colors.ultramarine[500]} />
        <ColorSwatch title="ultramarine-600" color={colors.ultramarine[600]} />
        <ColorSwatch title="ultramarine-700" color={colors.ultramarine[700]} />
        <ColorSwatch title="ultramarine-800" color={colors.ultramarine[800]} />
        <ColorSwatch title="ultramarine-900" color={colors.ultramarine[900]} />
      </ColorSwatchGrid>
      <h3>Purple</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="purple-50" color={colors.purple[50]} darkText />
        <ColorSwatch title="purple-100" color={colors.purple[100]} darkText />
        <ColorSwatch title="purple-200" color={colors.purple[200]} darkText />
        <ColorSwatch title="purple-300" color={colors.purple[300]} darkText />
        <ColorSwatch title="purple-400" color={colors.purple[400]} />
        <ColorSwatch title="purple-500" color={colors.purple[500]} />
        <ColorSwatch title="purple-600" color={colors.purple[600]} />
        <ColorSwatch title="purple-700" color={colors.purple[700]} />
        <ColorSwatch title="purple-800" color={colors.purple[800]} />
        <ColorSwatch title="purple-900" color={colors.purple[900]} />
      </ColorSwatchGrid>
      <h3>Magenta</h3>
      <ColorSwatchGrid>
        <ColorSwatch title="magenta-50" color={colors.magenta[50]} darkText />
        <ColorSwatch title="magenta-100" color={colors.magenta[100]} darkText />
        <ColorSwatch title="magenta-200" color={colors.magenta[200]} darkText />
        <ColorSwatch title="magenta-300" color={colors.magenta[300]} darkText />
        <ColorSwatch title="magenta-400" color={colors.magenta[400]} darkText />
        <ColorSwatch title="magenta-500" color={colors.magenta[500]} darkText />
        <ColorSwatch title="magenta-600" color={colors.magenta[600]} darkText />
        <ColorSwatch title="magenta-700" color={colors.magenta[700]} />
        <ColorSwatch title="magenta-800" color={colors.magenta[800]} />
        <ColorSwatch title="magenta-900" color={colors.magenta[900]} />
      </ColorSwatchGrid>
    </>
  );
};
