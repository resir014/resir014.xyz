import * as React from 'react'
import { css } from 'glamor'
import * as Color from 'color'

import flavorText from '../../utils/flavorText'
import { colors, breakpoints, widths, sharedStyles } from '../../utils/theme'
import { sectionHeading, highlightedText } from '../../utils/mixins'

const markdownContentClass = css(sharedStyles.markdown)

interface MarkdownContentProps {
  html: string
}

const MarkdownContent: React.SFC<MarkdownContentProps> = ({ html }) => (
  <div className={`${markdownContentClass}`} dangerouslySetInnerHTML={{ __html: html }} />
)

export default MarkdownContent
