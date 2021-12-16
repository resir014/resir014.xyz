import { css } from '@emotion/react';
import { transparentize } from 'polished';
import { theme } from '@resir014/chungking-react';

export const MastheadLinkStyles = css`
  display: block;
  padding: ${theme.space.xs}px 0;
  padding-bottom: calc(8px - 2px);
  border-bottom: 2px solid transparent;

  &:hover,
  &:focus {
    text-decoration: none;
    border-bottom-color: ${theme.colors.white};
  }

  &:focus,
  &:active {
    background-color: ${transparentize(0.9, theme.colors.white)};
  }

  &.is-active {
    text-decoration: none;
    border-bottom-color: ${theme.colors.white};

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }

  ${theme.mediaQueries.lg} {
    padding: ${theme.space.md}px 0;
    padding-bottom: calc(16px - 2px);
  }
`;

export const MastheadTitleLinkStyles = css`
  font-weight: 700;

  span {
    font-weight: 400;
    white-space: nowrap;
  }
`;
