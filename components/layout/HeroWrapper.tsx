import { useTheme } from '@emotion/react';
import { Box, Theme } from '@resir014/chungking-react';
import * as React from 'react';

interface HeroWrapperProps {
  className?: string;
}

const HeroWrapper: React.FC<HeroWrapperProps> = ({ children, className }) => {
  const theme: Theme = useTheme() as Theme;

  return (
    <Box
      as="header"
      display="grid"
      gridTemplateColumns={`1fr 1fr minmax(auto, ${theme.sizes.containers.md}px) 1fr 1fr`}
      position="relative"
      m={0}
      pt="xxl"
      px="lg"
      className={className}
    >
      <Box display="flex" flexDirection="column" gridColumn="3/4">
        {children}
      </Box>
    </Box>
  );
};

export default HeroWrapper;
