import { css } from '@emotion/react';
import { transparentize } from 'polished';
import * as React from 'react';
import { Anchor, Box, Text, BoxProps, theme, Heading } from '@resir014/chungking-react';
import { BaseBookmarkProps } from '~/types/posts';

interface BookmarkListItemProps extends BoxProps {
  bookmark: BaseBookmarkProps;
}

const BookmarkListItem: React.FC<BookmarkListItemProps> = ({ bookmark, ...rest }) => {
  const { title, link } = bookmark;

  const parsedURL = React.useMemo(() => new URL(link), [link]);

  return (
    <Box
      as="li"
      position="relative"
      boxShadow="single"
      borderRadius={6}
      css={css`
        background-color: ${theme.colors.grey[800]};
        background-image: linear-gradient(
          to right,
          ${theme.colors.grey[800]},
          ${theme.colors.grey[700]}
        );
      `}
      {...rest}
    >
      <Heading as="h3" display="block" m={0} py="sm" px="lg" variant="xl" fontWeight={600}>
        <Anchor
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          css={css`
            text-decoration: none;

            &:hover,
            &:focus {
              text-decoration: none;

              span {
                text-decoration: underline;
              }
            }

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
          <span>{title}</span>&nbsp;&rarr;
        </Anchor>
      </Heading>
      <Text
        display="block"
        variant="sm"
        px="lg"
        py="xs"
        backgroundColor={transparentize(0.3, theme.colors.black)}
      >
        {parsedURL.host}
      </Text>
    </Box>
  );
};

export default BookmarkListItem;
