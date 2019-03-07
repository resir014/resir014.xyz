import styled from '@emotion/styled'

const ResponsiveVideo = styled('section')`
  display: block;
  position: relative;
  width: 100%;
  padding: 0;
  padding-top: 56.25%;
  overflow: hidden;

  .responsive-item,
  embed,
  iframe,
  object,
  video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`

export default ResponsiveVideo
