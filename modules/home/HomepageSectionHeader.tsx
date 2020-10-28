import * as React from 'react'
import { Stack, StackProps, Text } from '~/components/chungking-core'
import HomepageSectionTitle from './HomepageSectionTitle'

interface HomepageSectionHeaderProps extends StackProps {
  className?: string
  style?: React.CSSProperties
  title: string
  description?: string
}

const HomepageSectionHeader: React.FC<HomepageSectionHeaderProps> = ({ className, style, title, description, ...rest }) => (
  <Stack spacing="xs" className={className} style={style} {...rest}>
    <HomepageSectionTitle>{title}</HomepageSectionTitle>
    {description && (
      <Text as="p" variant={500} fontWeight={300}>
        {description}
      </Text>
    )}
  </Stack>
)

export default HomepageSectionHeader
