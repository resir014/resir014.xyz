import { css } from '@emotion/core'
import { themeProps, TypeScale } from '../../../Theme'
import { breakpoints } from '../../../utils'

/**
 * Determines font sizes based on the text type and size index.
 *
 * @param scale The size key.
 */
export default function determineFontDimensions(scale: TypeScale) {
  const match = themeProps.typeScale[scale]

  return css`
    font-size: ${match.sm.fontSize}px;
    line-height: ${match.sm.lineHeight}px;

    @media (min-width: ${breakpoints.lg}px) {
      font-size: ${match.lg.fontSize}px;
      line-height: ${match.lg.lineHeight}px;
    }
  `
}
