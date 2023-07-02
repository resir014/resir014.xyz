import Image from 'next/legacy/image';
import * as React from 'react';

import siteMetadata from '~/lib/data/site-metadata';

export const HomepageHero: React.FC = () => {
  const { title, description } = siteMetadata;

  return (
    <div className="relative w-full h-[360px] overflow-hidden">
      <Image src="/static/DSC07559.jpg" layout="fill" objectFit="cover" />
      <div className="absolute w-full h-full bg-gradient-to-br from-chungking-ultramarine-700 to-chungking-green-700 opacity-75 mix-blend-color-burn" />
      <div className="flex items-center justify-center absolute w-full h-full p-6 shadow-hero-inner">
        <div className="flex flex-col space-y-6 items-center">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-chungking-turquoise-400 font-semibold">
              {title}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
