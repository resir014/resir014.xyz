import * as React from 'react'
import styled, { css } from 'styled-components'

import { sectionHeading, highlightedText } from '../utils/globalStyles'
import { photonColors, headerColors, borderColors, heights } from '../utils/theme'
import Container from './Container'
import mediaQueries, { widths } from '../utils/mediaQueries'

// TODO: stop using this when we finally convert to Photon colors:
// http://design.firefox.com/photon/visuals/color.html
const getHeaderColor = (index: number) => headerColors[index]

const PageHeaderInner = styled.div`
  display: flex;
  min-height: 12rem;

  @media ${mediaQueries.lg} {
    min-height: 15rem;
  }
`

const PageHeaderTitle = styled.div`
  align-self: flex-end;
  padding-top: 3rem;
  font-size: 1.25rem;

  @media ${mediaQueries.sm} {
    width: 75%;
    font-size: 1.5rem;
  }

  .page-meta, .post-meta {
    margin-bottom: .5rem;
    font-size: 80%;

    span {
      ${sectionHeading(photonColors.white, 0, '.5rem')}
    }
  }
`

interface HeaderWrapperProps {
  state: {
    gradientStartIndex: number
    gradientEndIndex: number
  }
  headerImage: string
  className?: string
}

const HeaderWrapperRoot: React.SFC<HeaderWrapperProps> = ({ state, className, headerImage, children }) => (
  <div className={className}>
    {children}
  </div>
)

const HeaderWrapper = styled(HeaderWrapperRoot)`
  min-height: 12rem;
  padding-top: ${heights.masthead};
  background: linear-gradient(to bottom right,
    ${props => getHeaderColor(props.state.gradientStartIndex)},
    ${props => getHeaderColor(props.state.gradientEndIndex)});

  @media ${mediaQueries.lg} {
    min-height: 15rem;
  }

  ${props => props.headerImage && hasHeaderImage}
`

const hasHeaderImage = css`
  position: relative;
  z-index: 1;

  &:before {
    content: " ";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-image: url(${(props: HeaderWrapperProps) => props.headerImage});
    background-size: cover;
    background-position-y: center;
    opacity: 0.7;

    @supports(mix-blend-mode: luminosity) {
      mix-blend-mode: luminosity;
      opacity: 0.7;
    }
  }
`

interface PageProps {
  headerImage?: string
}

interface PageState {
  gradientStartIndex: number
  gradientEndIndex: number
}

class PageHeader extends React.Component<PageProps, PageState> {
  constructor (props: PageProps) {
    super(props)
    this.state = {
      gradientStartIndex: 0,
      gradientEndIndex: 0
    }
  }

  public componentWillMount() {
    this.setState({
      gradientStartIndex: Math.floor(Math.random() * headerColors.length),
      gradientEndIndex: Math.floor(Math.random() * headerColors.length)
    })
  }

  public render() {
    const { headerImage, children } = this.props
    return (
      <HeaderWrapper state={this.state} headerImage={headerImage}>
        <Container>
          <PageHeaderInner>
            <PageHeaderTitle>{children}</PageHeaderTitle>
          </PageHeaderInner>
        </Container>
      </HeaderWrapper>
    )
  }
}

export default PageHeader
