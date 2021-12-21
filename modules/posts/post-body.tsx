import * as React from 'react';
import CSS from 'csstype';
import convert from 'htmr';
import { Anchor, Box, MessageBox, Paragraph, Space } from '@resir014/chungking-react';

import { ListItem, UnorderedList } from '../markdown';
import { Container, ContainerSizes } from '~/components/layout';
import { SyndicationFormat } from '~/types/default';
import htmrTransform from '~/lib/htmr-transform';

interface PostBodyProps {
  content?: string;
  containerSize?: ContainerSizes;
  syndication?: SyndicationFormat[];
  spacing?: Space | CSS.Property.Margin;
}

const PostBody: React.FC<PostBodyProps> = ({
  content,
  syndication,
  containerSize = 'md',
  children,
}) => {
  const renderSyndication = () => {
    if (syndication) {
      return (
        <MessageBox mb="lg">
          <Paragraph mb="xs">This post is also published on:</Paragraph>
          <UnorderedList>
            {syndication.map(item => (
              <ListItem key={item.url}>
                <Anchor
                  href={item.url}
                  target="_blank"
                  className="u-syndication"
                  rel="noopener noreferrer external syndication"
                >
                  {item.name}
                </Anchor>
              </ListItem>
            ))}
          </UnorderedList>
        </MessageBox>
      );
    }

    return null;
  };

  if (content) {
    return (
      <Box as="section" px="lg" pt={64} pb={96}>
        <Container size={containerSize}>
          {renderSyndication()}
          <div className="e-content mx-auto prose lg:prose-lg prose-base prose-invert prose-chungking">
            {convert(content, {
              transform: htmrTransform,
            })}
          </div>
        </Container>
      </Box>
    );
  }

  return (
    <Box as="section" p="lg" pb={96}>
      <Container size={containerSize}>
        {renderSyndication()}
        <div className="e-content mx-auto">{children}</div>
      </Container>
    </Box>
  );
};

export default PostBody;
