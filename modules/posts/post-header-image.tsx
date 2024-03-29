import Image from 'next/legacy/image';
import * as React from 'react';
import { Container } from '~/components/layout';

export interface PostHeaderImageProps {
  src: string;
  alt?: string;
}

export const PostHeaderImage: React.FC<PostHeaderImageProps> = ({ alt, src }) => {
  return (
    <section className="px-4 lg:px-6 pt-12">
      <Container>
        <div className="relative w-full h-full aspect-video overflow-hidden rounded-md shadow-lg">
          <Image loading="lazy" src={src} alt={alt} layout="fill" objectFit="cover" />
        </div>
      </Container>
    </section>
  );
};
