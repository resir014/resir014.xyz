import * as React from 'react';
import convert from 'htmr';

import { PostHCard } from '.';
import { Container, ContainerSizes } from '~/components/layout';
import { SyndicationFormat } from '~/types/default';
import htmrTransform from '~/lib/htmr-transform';
import { SiteAuthor } from '~/lib/data/site-metadata';
import { MessageBox } from '~/components/ui/message-box';

export interface PostBodyProps {
  content?: string;
  containerSize?: ContainerSizes;
  syndication?: SyndicationFormat[];
  author?: SiteAuthor;
}

export const PostBody: React.FC<PostBodyProps> = ({
  content,
  syndication,
  containerSize = 'md',
  author,
  children,
}) => {
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
      <section className="px-6 pt-12 pb-24">
        <Container size={containerSize}>
          <div className="space-y-12">
            {renderSyndication()}
            <div className="e-content mx-auto prose lg:prose-lg prose-base prose-invert prose-chungking">
              {convert(content, {
                transform: htmrTransform,
              })}
            </div>
            {author && <PostHCard author={author} />}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="px-6 pt-12 pb-24">
      <Container size={containerSize}>
        <div className="space-y-12">
          {renderSyndication()}
          <div className="e-content mx-auto">{children}</div>
          {author && <PostHCard author={author} />}
        </div>
      </Container>
    </section>
  );
};
