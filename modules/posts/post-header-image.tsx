import Image from 'next/image';
import * as React from 'react';
import { Container } from '~/components/layout';

export interface PostHeaderImageProps {
  src: string;
  alt?: string;
}

export const PostHeaderImage: React.FC<PostHeaderImageProps> = ({ alt, src }) => {
  return (
    <section className="px-6 pt-12">
      <Container>
        <div className="relative w-full h-[420px] overflow-hidden rounded-md shadow-lg">
          <Image loading="lazy" src={src} alt={alt} layout="fill" objectFit="cover" />
        </div>
      </Container>
    </section>
  );
};
