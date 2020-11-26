import { css } from '@emotion/core'
import * as React from 'react'
import { Anchor, Box, BoxProps, colors } from '@resir014/chungking-react'
import { LinktreeItem } from '~/types/default'

interface LinktreeCardProps extends BoxProps {
  item: LinktreeItem
}

const LinktreeCard: React.FC<LinktreeCardProps> = ({ className, style, item, ...rest }) => {
  return (
    <Box
      as="li"
      spacing="md"
      position="relative"
      boxShadow="single"
      p="md"
      borderRadius={6}
      backgroundColor={item.backgroundColor || 'grey.900'}
      className={className}
      style={style}
      {...rest}
    >
      <Anchor
        variant={500}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          color: ${item.textColor || colors.white};

          &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
          }
        `}
      >
        {item.title}
      </Anchor>
    </Box>
  )
}

export default LinktreeCard
