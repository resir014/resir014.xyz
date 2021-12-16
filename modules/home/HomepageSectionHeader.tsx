import * as React from 'react';
import { Stack, StackProps, Text } from '@resir014/chungking-react';
import HomepageSectionTitle from './HomepageSectionTitle';

interface HomepageSectionHeaderProps extends StackProps {
  className?: string;
  style?: React.CSSProperties;
  title: string;
  description?: string;
}

const HomepageSectionHeader: React.FC<HomepageSectionHeaderProps> = ({
  className,
  style,
  title,
  description,
  ...rest
}) => (
  <Stack spacing="xs" className={className} style={style} {...rest}>
    <HomepageSectionTitle>{title}</HomepageSectionTitle>
    {description && (
      <Text as="p" fontSize="xl" fontWeight={300}>
        {description}
      </Text>
    )}
  </Stack>
);

export default HomepageSectionHeader;
