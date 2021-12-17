import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@resir014/chungking-react';

interface DividerProps {
  className?: string;
  spacing?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  center?: boolean;
}

const Divider: React.FC<DividerProps> = ({ className }) => <hr className={className} />;

const DividerFullWidth = (props: DividerProps) => css`
  width: ${theme.space.xxl * 2}px;
  margin-left: ${props.center ? 'auto' : 0};
  margin-right: auto;
`;

const DividerMatcher = (props: DividerProps) => {
  switch (props.spacing) {
    case 'large': {
      return css`
        margin-top: ${theme.space.xxl}px;
        margin-bottom: ${theme.space.xxl}px;
      `;
    }
    case 'small': {
      return css`
        margin-top: ${theme.space.md}px;
        margin-bottom: ${theme.space.md}px;
      `;
    }
    default: {
      return css`
        margin-top: ${theme.space.lg}px;
        margin-bottom: ${theme.space.lg}px;
      `;
    }
  }
};

const DividerBase = (props: DividerProps) => css`
  position: relative;
  height: 6px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(to right, ${theme.colors.blue[500]}, ${theme.colors.magenta[400]});

  ${!props.fullWidth && DividerFullWidth(props)};
`;

export default styled(Divider)(DividerBase, DividerMatcher);
