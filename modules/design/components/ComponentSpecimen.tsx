import * as React from 'react'
import { Stack, StackProps } from '~/components/chungking-core'

interface ComponentSpecimenProps extends StackProps {
  className?: string
  style?: React.CSSProperties
}

const ComponentSpecimen: React.FC<ComponentSpecimenProps> = ({ className, style, spacing, children }) => {
  return (
    <Stack className={className} style={style} spacing={spacing} px="lg" py="md" bg="grey.900" borderRadius={6} boxShadow="single">
      {children}
    </Stack>
  )
}

export default ComponentSpecimen
