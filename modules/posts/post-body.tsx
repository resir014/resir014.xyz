import * as React from 'react';
import convert from 'htmr';

import { Container, ContainerSizes } from '~/components/layout';
import type { SyndicationFormat } from '~/types/default';
import htmrTransform from '~/lib/htmr-transform';
import { SiteAuthor } from '~/lib/data/site-metadata';
import { MessageBox } from '~/components/ui/message-box';
import { PostHCard } from '.';

export interface PostBodyProps {
  content?: string;
  containerSize?: ContainerSizes;
  syndication?: SyndicationFormat[];
  author?: SiteAuthor;
}

export function PostBody({
  content,
  syndication,
  containerSize = 'md',
  author,
  children,
}: React.PropsWithChildren<PostBodyProps>) {
  const renderSyndication = () => {
    if (syndication) {
      return (
        <MessageBox className="space-y-2">
          <p className="text-base">This post is also published on:</p>
          <ul className="list-disc list-inside">
            {syndication.map(item => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  className="u-syndication text-chungking-turquoise-400 hover:underline"
                  rel="noopener noreferrer external syndication"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </MessageBox>
      );
    }

    return null;
  };

  if (content) {
    return (
      <section className="px-4 lg:px-6 pt-12 pb-24">
        <Container size={containerSize}>
          <div className="space-y-12">
            {renderSyndication()}
            <div className="e-content prose lg:prose-lg prose-base prose-invert prose-chungking">
              {convert(content, {
                transform: htmrTransform,
              })}
            </div>
            {author ? <PostHCard author={author} /> : null}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="px-4 lg:px-6 pt-12 pb-24">
      <Container size={containerSize}>
        <div className="space-y-12">
          {renderSyndication()}
          <div className="e-content">{children}</div>
          {author ? <PostHCard author={author} /> : null}
        </div>
      </Container>
    </section>
  );
}
