import * as React from 'react'
import { Text } from '@resir014/chungking-react'

interface ColorSwatchProps {
  weight?: number
  fontFamily?: 'sans' | 'monospace'
}

const TypographySpecimen: React.FC<ColorSwatchProps> = ({ children, fontFamily, weight }) => (
  <Text fontSize={fontFamily !== 'monospace' ? undefined : '2rem'} fontWeight={weight} fontFamily={fontFamily}>
    {children}
  </Text>
)

TypographySpecimen.defaultProps = {
  weight: 400,
  fontFamily: 'sans'
}

export default TypographySpecimen
