import * as React from 'react';
import convert from 'htmr';
import { PhotoWrapper } from './photo-wrapper';
import htmrTransform from '~/lib/htmr-transform';
import { Container, ContainerSizes } from '~/components/layout';

export interface PhotoPostBodyProps {
  content?: string;
  image?: string;
  containerSize?: ContainerSizes;
}

export const PhotoPostBody: React.FC<PhotoPostBodyProps> = ({
  content,
  containerSize = 'md',
  image,
  children,
}) => {
  const renderContent = () => {
    if (content) {
      return convert(content, { transform: htmrTransform });
    }

    return children;
  };

  return (
    <section className="px-6 pt-6 pb-[96px]">
      <Container size={containerSize}>
        <div className="space-y-4">
          {image && <PhotoWrapper image={image} />}
          <div className="e-content mx-auto prose lg:prose-lg prose-base prose-invert prose-chungking">
            {renderContent()}
          </div>
        </div>
      </Container>
    </section>
  );
};
