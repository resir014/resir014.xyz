import Image from 'next/image';
import * as React from 'react';
import { Container } from '~/components/layout';
import { Avatar } from '~/components/ui';
import siteMetadata from '~/lib/data/site-metadata';

export function LinktreeHeader() {
  const { title, description } = siteMetadata;

  return (
    <div className="px-6 pt-12">
      <Container>
        <div className="relative w-full h-[256px] overflow-hidden rounded-md shadow-lg">
          <Image src="/static/DSC07559.jpg" layout="fill" objectFit="cover" />
          <div className="absolute w-full h-full bg-gradient-to-br from-chungking-ultramarine-700 to-chungking-green-700 opacity-75 mix-blend-color-burn" />
          <div className="flex items-center justify-center absolute w-full h-full">
            <div className="flex flex-col space-y-6 items-center">
              <Avatar src="/static/resir014-icon.png" size={96} />
              <div className="space-y-1 text-center">
                <h1 className="text-2xl text-chungking-turquoise-400 font-semibold">{title}</h1>
                <p className="font-semibold">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
