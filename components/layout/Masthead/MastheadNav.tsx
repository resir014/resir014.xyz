/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { css } from '@emotion/core'
import clsx from 'clsx'

import { Text } from '@resir014/chungking-core'
import { MenuItem } from '~/types/default'
import { MastheadLinkStyles } from './styled'

interface MastheadNavProps {
  items: MenuItem[]
}

const MastheadNav: React.FC<MastheadNavProps> = ({ items }) => {
  const { asPath } = useRouter()

  return (
    <>
      {items.map((item) => {
        const isActive = asPath !== '/' && asPath.startsWith(item.path)

        return (
          <Text
            as="li"
            key={item.name}
            mr="lg"
            css={css`
              text-transform: lowercase;

              &:last-child {
                margin-right: 0;
              }
            `}
          >
            <Link href={item.path} as={item.as} passHref>
              <a css={MastheadLinkStyles} className={clsx(isActive && 'is-active')}>
                {item.name}
              </a>
            </Link>
          </Text>
        )
      })}
    </>
  )
}

export default MastheadNav
