import * as React from 'react';
import clsx from 'clsx';
import CSS from 'csstype';
import convert from 'htmr';
import Link from 'next/link';
import { Anchor, Box, MessageBox, Paragraph, Space } from '@resir014/chungking-react';

import { ListItem, UnorderedList } from '../markdown';
import { Container, ContainerSizes } from '~/components/layout';
import { SyndicationFormat } from '~/types/default';

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
              transform: {
                iframe: ({ className, title, ...rest }: JSX.IntrinsicElements['iframe']) => (
                  <iframe
                    title={title}
                    className={clsx(
                      'w-full aspect-video rounded-lg drop-shadow-lg overflow-hidden',
                      className
                    )}
                    {...rest}
                  />
                ),
                pre: ({ className, ...rest }: JSX.IntrinsicElements['pre']) => (
                  <pre
                    className={clsx(
                      'rounded-lg drop-shadow-lg overflow-hidden lg:-mx-12',
                      className
                    )}
                    {...rest}
                  />
                ),
                figure: ({ className, ...rest }: JSX.IntrinsicElements['figure']) => (
                  <figure
                    className={clsx('space-y-2 text-center lg:-mx-12', className)}
                    {...rest}
                  />
                ),
                figcaption: ({ className, ...rest }: JSX.IntrinsicElements['figcaption']) => (
                  <figcaption className={clsx('text-sm', className)} {...rest} />
                ),
                img: ({ className, alt, ...rest }: JSX.IntrinsicElements['img']) => (
                  <img
                    className={clsx(
                      'mx-auto rounded-lg drop-shadow-lg bg-chungking-grey-800',
                      className
                    )}
                    alt={alt}
                    {...rest}
                  />
                ),
                a: (node: JSX.IntrinsicElements['a']) => {
                  const { href, children: innerChildren, ...rest } = node;

                  if (href) {
                    if (href.substr(0, 4) === 'http') {
                      return (
                        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
                          {innerChildren}
                        </a>
                      );
                    }

                    return (
                      <Link href={href} passHref>
                        <a {...rest}>{innerChildren}</a>
                      </Link>
                    );
                  }

                  return (
                    <a href={href} {...rest}>
                      {children}
                    </a>
                  );
                },
              },
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
