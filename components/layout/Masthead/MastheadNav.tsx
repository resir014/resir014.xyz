/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Text } from '@resir014/chungking-react'
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
            sx={{
              textTransform: 'lowercase',
              _last: {
                marginRight: 0
              }
            }}
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
