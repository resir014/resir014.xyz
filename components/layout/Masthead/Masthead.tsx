import * as React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

import { theme, Text } from '@resir014/chungking-react'
import { MenuProps } from '~/types/default'

import MastheadNav from './MastheadNav'
import { MastheadLinkStyles, MastheadTitleLinkStyles } from './styled'

interface MastheadProps extends MenuProps {
  title: string
  className?: string
}

const Root = styled('nav')`
  display: grid;
  grid-template-columns: 1fr 1fr minmax(auto, ${theme.sizes.containers.xl}px) 1fr 1fr;
  padding: 0 ${theme.space.lg}px;
  background-color: ${theme.colors.grey[800]};
  z-index: 50;
  box-shadow: inset 0 -1px ${theme.colors.grey[900]};
`

const MastheadInner = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  grid-column: 3/4;
  margin: 0;
  padding: 0;
  list-style-type: none;

  ${theme.mediaQueries.lg} {
    justify-content: flex-end;
  }
`

const MastheadTitle = styled(Text)`
  margin-right: auto;

  @media (max-width: calc(${theme.breakpoints[3]} - 1px)) {
    flex-basis: 100%;
    text-align: center;
  }
`

const MastheadTitleLink = styled('a')(MastheadLinkStyles, MastheadTitleLinkStyles)

const Masthead: React.FC<MastheadProps> = ({ className, title, items }) => {
  return (
    <Root className={className}>
      <MastheadInner>
        <MastheadTitle as="li">
          <Link href="/" passHref>
            <MastheadTitleLink>{title}</MastheadTitleLink>
          </Link>
        </MastheadTitle>
        <MastheadNav items={items} />
      </MastheadInner>
    </Root>
  )
}

export default Masthead
