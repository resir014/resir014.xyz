import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@resir014/chungking-react';
import { toClipboard } from 'copee';

interface ColorSwatchProps {
  color: string;
  title?: string;
  darkText?: boolean;
}

const Root = styled('button')`
  display: inline-block;
  width: 92px;
  margin: 0;
  margin-right: 24px;
  margin-bottom: 24px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background: none;
  background-color: ${theme.colors.grey[800]};
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: ${theme.shadows.single};

  &:hover,
  &:focus {
    box-shadow: ${theme.shadows.double};
  }

  &:focus {
    outline: none;

    > div {
      opacity: 0.7;
    }
  }
`;

const Inner = styled('div')<ColorSwatchProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 76px;
  width: 76px;
  color: ${props => (props.darkText ? theme.colors.black : theme.colors.white)};
  font-size: 12px;
  background: ${props => props.color};
  border: 1px solid transparent;
  border-radius: 3px;
  transition: all 0.3s ease;
`;

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, title, darkText }) => {
  const [copySuccess, setCopySuccess] = React.useState<string | undefined>(undefined);

  function copyToClipboard(str: string) {
    return () => {
      const success = toClipboard(str);

      if (success) {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(undefined), 3000);
      }
    };
  }

  return (
    <Root className="not-prose" type="button" onClick={copyToClipboard(color)}>
      <Inner color={color} darkText={darkText}>
        {copySuccess ?? title ?? color}
      </Inner>
    </Root>
  );
};

export default ColorSwatch;
