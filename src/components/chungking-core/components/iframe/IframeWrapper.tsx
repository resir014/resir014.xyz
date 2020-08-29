import * as React from 'react'
import styled from '@emotion/styled'
import { Box, BoxProps } from '../../foundations/box'

export interface IframeWrapperProps extends BoxProps {
  ratio?: number
}

const StyledWrapper = styled(Box)<IframeWrapperProps>`
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-bottom: calc(100% / (${props => props.ratio}));
  }
`

const IframeWrapper: React.FC<IframeWrapperProps> = ({ ratio, children, ...rest }) => {
  return (
    <StyledWrapper ratio={ratio} {...rest}>
      {children}
    </StyledWrapper>
  )
}

IframeWrapper.defaultProps = {
  ratio: 16 / 9
}

export default IframeWrapper
