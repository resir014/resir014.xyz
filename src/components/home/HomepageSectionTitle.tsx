import * as React from 'react'
import styled from 'styled-components'

import { emSizes, colors } from '../../styles/variables'
import { media } from '../../styles/mixins'

interface HomepageSectionTitleProps {
  className?: string
}

const HomepageSectionTitle: React.SFC<HomepageSectionTitleProps> = ({
  children,
  className
}) => <h1 className={className}>{children}</h1>

export default styled(HomepageSectionTitle)`
  text-align: center;
`
