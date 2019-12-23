/*
 * Inspired by paulirish/lite-youtube-embed
 * https://github.com/paulirish/lite-youtube-embed
 */

import * as React from 'react'
import clsx from 'clsx'
import styled from '@emotion/styled'

const LiteYouTubeWrapper = styled('div')`
  display: block;
  position: relative;
  box-sizing: content-box;
  contain: content;
  background-position: center center;
  background-size: cover;
  background-color: #000;
  cursor: pointer;

  /* gradient */
  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
    background-position: top;
    background-repeat: repeat-x;
    height: 60px;
    padding-bottom: 50px;
    width: 100%;
    transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  }

  /*
   * responsive iframe with a 16:9 aspect ratio
   * thanks https://css-tricks.com/responsive-iframes/
   */
  ::after {
    content: '';
    display: block;
    padding-bottom: calc(100% / (16 / 9));
  }
  & > iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* play button */
  & > .lty-playbtn {
    width: 68px;
    height: 48px;
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    top: 50%;
    left: 50%;
    z-index: 1;
    /* YT's actual play button svg */
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 68 48"><path fill="%23f00" fill-opacity="0.8" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path d="M 45,24 27,14 27,34" fill="%23fff"></path></svg>');
    filter: grayscale(100%);
    transition: filter 0.1s cubic-bezier(0, 0, 0.2, 1);
  }
  :hover > .lty-playbtn {
    filter: none;
  }

  /* Post-click styles */
  &.lyt-activated {
    cursor: unset;
  }
  &.lyt-activated::before,
  &.lyt-activated > .lty-playbtn {
    opacity: 0;
    pointer-events: none;
  }
`

function addPrefetch(kind: 'preload' | 'preconnect', url: string, as?: string) {
  const linkElem = document.createElement('link')
  linkElem.rel = kind
  linkElem.href = url
  if (as) {
    linkElem.as = as
  }
  linkElem.crossOrigin = 'true'
  document.head.append(linkElem)
}

interface LiteYouTubeProps {
  videoId: string
  style?: React.CSSProperties
}

const LiteYouTube = ({ videoId, style }: LiteYouTubeProps) => {
  const encodedVideoId = encodeURIComponent(videoId)
  const posterUrl = `https://i.ytimg.com/vi/${encodedVideoId}/hqdefault.jpg`

  React.useEffect(() => {
    addPrefetch('preload', posterUrl, 'image')

    // The iframe document and most of its subresources come right off youtube.com
    addPrefetch('preconnect', 'https://www.youtube-nocookie.com')

    // The botguard script is fetched off from google.com
    addPrefetch('preconnect', 'https://www.google.com')

    // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
    addPrefetch('preconnect', 'https://googleads.g.doubleclick.net')
    addPrefetch('preconnect', 'https://static.doubleclick.net')
  }, [])

  const [activated, setActivated] = React.useState(false)

  const addIframe = () => {
    if (activated) return
    setActivated(true)
  }

  return (
    <LiteYouTubeWrapper
      style={{ ...style, backgroundImage: `url(${posterUrl})` }}
      onClick={addIframe}
      className={clsx('youtube-lite', activated && 'lyt-activated')}
    >
      <div className="lty-playbtn" />
      {activated && (
        <iframe
          title="YouTube Video"
          width="560"
          height="315"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={`https://www.youtube-nocookie.com/embed/${encodedVideoId}?autoplay=1`}
        />
      )}
    </LiteYouTubeWrapper>
  )
}

export default LiteYouTube
