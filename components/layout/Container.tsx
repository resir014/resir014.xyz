import * as React from 'react'
import { Box, BoxProps, Theme } from '@resir014/chungking-react'
import { useTheme } from '@emotion/react'

export type ContainerSizes = 'md' | 'lg' | 'xl' | 'fluid'

interface ContainerProps extends BoxProps {
  className?: string
  style?: React.CSSProperties
  size?: ContainerSizes
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({ className, style, children, size = 'md', ...rest }, ref) => {
  const theme: Theme = useTheme() as Theme

  const isMdOrHigher = React.useMemo(() => size === 'md' || size === 'lg' || size === 'xl', [size])
  const isLgOrHigher = React.useMemo(() => size === 'lg' || size === 'xl', [size])

  return (
    <Box
      ref={ref}
      className={className}
      style={style}
      sx={{
        position: 'relative',
        marginInline: 'auto',
        maxWidth:
          size === 'fluid'
            ? undefined
            : [
                null,
                null,
                isMdOrHigher ? theme.sizes.containers.md : null,
                isLgOrHigher ? theme.sizes.containers.lg : null,
                size === 'xl' ? theme.sizes.containers.xl : null
              ]
      }}
      {...rest}
    >
      {children}
    </Box>
  )
})

export default Container
