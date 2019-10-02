import * as React from 'react'
import styled from '@emotion/styled'

import { colors, layerShadows } from '../../styles/variables'
import { Heading, Text } from '../chungking-core'

interface HomepageThumbnailTextProps {
  className?: string
  title: string
  flavour?: string
}

const FlexInner = styled('div')`
  padding: 1.5rem;
  color: ${colors.white};
  background-color: ${colors.black};
  border-radius: 10px;
  box-shadow: ${layerShadows.double};
`

const Div = styled('div')`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const HomepageHeroText: React.SFC<HomepageThumbnailTextProps> = ({ className, title, flavour }) => (
  <Div className={className}>
    <FlexInner>
      <Heading as="h1" scale="canon" mt={0} mb="md">
        {title}
      </Heading>
      {flavour && (
        <Text scale="paragon" m={0} fontWeight={300}>
          {flavour}
        </Text>
      )}
    </FlexInner>
  </Div>
)

export default HomepageHeroText
