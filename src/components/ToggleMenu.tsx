import * as React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import * as Color from 'color'
import styled, { css } from 'styled-components'

import Container from './Container'
import { MastheadToggleButton } from './Masthead'

import { colors, heights } from '../utils/theme'
import { MenuProps, MenuItem } from '../utils/types'
import mediaQueries from '../utils/mediaQueries'

interface ToggleMenuProps extends MenuProps {
  visible?: boolean
  onCloseButtonClick: () => any
}

interface StyledToggleMenuProps {
  isOpen?: boolean
}

const StyledToggleMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: auto;
  left: auto;
  z-index: 250;
  color: #000;
  width: 100vw;
  transition: -webkit-transform 275ms cubic-bezier(.5,.08,0,1);
  transition: transform 275ms cubic-bezier(.5,.08,0,1);
  transition: transform 275ms cubic-bezier(.5,.08,0,1),-webkit-transform 275ms cubic-bezier(.5,.08,0,1);

  @media only screen and ${mediaQueries.md} {
    width: 350px;
  }

  ${(props: StyledToggleMenuProps) => props.isOpen === true && css`
    transform: translate(0);
  `}

  ${(props: StyledToggleMenuProps) => props.isOpen === false && css`
    transform: translate(100%);
  `}
`

const ToggleMenuInner = styled.nav`
  color: ${colors.white};
  background-color: ${colors.grey90};
`

const ToggleMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 1.5rem;
  height: ${heights.masthead};
  align-items: center;
  justify-content: flex-end;
`

const ToggleMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  padding-bottom: 1.5rem;
`

const ToggleMenuFooter = styled.div`
  padding: 1.5rem;

  a {
    color: ${colors.blue40};
    text-decoration: underline;

    &:hover, &:focus {
      color: ${colors.blue50};
    }

    @media ${mediaQueries.md} {
      text-decoration: none;

      &:hover, &:focus {
        text-decoration: underline;
      }
    }
  }

  p, small {
    display: block;
    margin: 0 0 0.5rem;
  }
`

const ToggleMenuItem = styled(Link)`
  display: block;
  padding: .5rem 0;
  textDecoration: none;
  textAlign: center;
  borderTop: 1px solid ${colors.white};

  &:hover, &:focus {
    textDecoration: 'none'
  }

  &:last-child {
    borderBottom: 1px solid ${colors.white};
  }
`

const ToggleMenu: React.SFC<ToggleMenuProps> = ({ visible, items, onCloseButtonClick }) => {
  return (
    <StyledToggleMenu isOpen={visible}>
      <ToggleMenuInner>
        <ToggleMenuHeader>
          <MastheadToggleButton onClick={onCloseButtonClick}>✕</MastheadToggleButton>
        </ToggleMenuHeader>
        <ToggleMenuItems>
          {items.map(item => <ToggleMenuItem key={item.path} to={item.path} onClick={onCloseButtonClick}>{item.name}</ToggleMenuItem>)}
        </ToggleMenuItems>
        <ToggleMenuFooter>
          <p>
            <a
              rel="license noopener noreferrer"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
            >
              <img alt="Creative Commons License" src="/images/cc-by-nc-sa.svg" style={{ height: '31px' }} />
            </a>
          </p>
          <p>
            <small>
              Except where otherwise noted, contents are licensed under{' '}
              <a
                rel="license noopener noreferrer"
                href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
              >
                CC-BY-NC-SA 4.0
              </a>.
            </small>
          </p>
          <p>
            <small>
              Powered by <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a>{' '}
              and <a href="https://www.reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>.{' '}
              Code licensed under the <a href="https://github.com/resir014/resir014.xyz" target="_blank">MIT License</a>.
            </small>
          </p>
        </ToggleMenuFooter>
      </ToggleMenuInner>
    </StyledToggleMenu>
  )
}

export default ToggleMenu
