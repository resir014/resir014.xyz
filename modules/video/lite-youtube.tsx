/*
 * Inspired by paulirish/lite-youtube-embed
 * https://github.com/paulirish/lite-youtube-embed
 */

import * as React from 'react';
import clsx from 'clsx';
import usePrefetch from '~/lib/use-prefetch';

interface LiteYouTubeProps {
  videoId: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LiteYouTube: React.FC<LiteYouTubeProps> = ({ videoId, className, style }) => {
  const encodedVideoId = encodeURIComponent(videoId);
  const posterUrl = `https://i.ytimg.com/vi/${encodedVideoId}/hqdefault.jpg`;

  usePrefetch('preload', posterUrl, 'image');

  // The iframe document and most of its subresources come right off youtube.com
  usePrefetch('preconnect', 'https://www.youtube-nocookie.com');

  // The botguard script is fetched off from google.com
  usePrefetch('preconnect', 'https://www.google.com');

  // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
  usePrefetch('preconnect', 'https://googleads.g.doubleclick.net');
  usePrefetch('preconnect', 'https://static.doubleclick.net');

  const [activated, setActivated] = React.useState(false);

  const addIframe = () => {
    if (activated) return;
    setActivated(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      addIframe();
    }
  };

  return (
    <div
      className={clsx('youtube-lite relative', activated && 'lyt-activated', className)}
      style={{ ...style, backgroundImage: `url(${posterUrl})` }}
      onClick={addIframe}
      tabIndex={0}
      onKeyPress={handleKeyPress}
      aria-label="Play media"
    >
      <div className="lty-playbtn" />
      {activated && (
        <iframe
          title="YouTube Video"
          width="700"
          height="394"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={`https://www.youtube-nocookie.com/embed/${encodedVideoId}?autoplay=1`}
        />
      )}
    </div>
  );
};

LiteYouTube.defaultProps = {
  className: undefined,
  style: undefined,
};

export default LiteYouTube;
