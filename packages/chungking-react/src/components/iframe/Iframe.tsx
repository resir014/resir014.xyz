import * as React from 'react'
import { Box } from '../../foundations'

export type IframeProps = JSX.IntrinsicElements['iframe']

const Iframe: React.ForwardRefRenderFunction<HTMLIFrameElement, IframeProps> = ({ title, ...rest }, ref) => {
  return <Box ref={ref} as="iframe" display="block" verticalAlign="middle" borderWidth={0} borderStyle="solid" title={title} {...rest} />
}

export default React.forwardRef(Iframe)
