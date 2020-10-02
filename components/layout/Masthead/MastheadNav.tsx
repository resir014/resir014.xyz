/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import { transparentize } from 'polished'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import clsx from 'clsx'

import { mediaQueries, colors, Text, space } from '~/components/chungking-core'
import { MenuItem } from '~/types/default'
import { MastheadLinkStyles } from './styled'

interface MastheadNavProps {
  items: MenuItem[]
}

const MastheadNavItem = styled(Text)`
  text-transform: lowercase;

  a {
    display: block;
    padding: ${space.xs}px 0;
    padding-bottom: calc(8px - 2px);
    border-bottom: 2px solid transparent;

    &:hover,
    &:focus {
      text-decoration: none;
      border-bottom-color: ${colors.white};
    }

    &:focus,
    &:active {
      background-color: ${transparentize(0.9, colors.white)};
    }

    &.is-active {
      text-decoration: none;
      border-bottom-color: ${colors.white};

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }

    ${mediaQueries.lg} {
      padding: ${space.md}px 0;
      padding-bottom: calc(16px - 2px);
    }
  }
`

const MastheadNavLink = styled('a')(MastheadLinkStyles)

const MastheadNav: React.FC<MastheadNavProps> = ({ items }) => {
  const { pathname } = useRouter()

  return (
    <>
      {items.map((item) => {
        const isActive = pathname !== '/' && pathname.startsWith(item.path)

        return (
          <MastheadNavItem
            as="li"
            key={item.path}
            mr="lg"
            css={css`
              &:last-child {
                margin-right: 0;
              }
            `}
          >
            <Link href={item.path} as={item.as} passHref>
              <MastheadNavLink className={clsx(isActive && 'is-active')}>{item.name}</MastheadNavLink>
            </Link>
          </MastheadNavItem>
        )
      })}
    </>
  )
}

export default MastheadNav
