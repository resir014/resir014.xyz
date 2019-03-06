import styled from '@emotion/styled'
import { colors } from '../../styles/variables'

interface ColorSwatchProps {
  color: string
  title?: string
  darkText?: boolean
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, title, darkText }) => (
  <Root>
    <Inner color={color} darkText={darkText}>
      {title || color}
    </Inner>
  </Root>
)

ColorSwatch.defaultProps = {
  title: undefined,
  darkText: false
}

const Root = styled('div')`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 5px 0px;
  width: 92px;
  display: inline-block;
  margin-top: 1rem;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 8px;
  border-radius: 5px;
  background-color: ${colors.grey90};
  transition: all 0.2s ease 0s;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;
`

const Inner = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 76px;
  width: 76px;
  color: ${(props: ColorSwatchProps) => (props.darkText ? colors.black : colors.white)};
  font-size: 12px;
  background: ${(props: ColorSwatchProps) => props.color};
  border-width: initial;
  border-style: initial;
  border-color: transparent;
  border-image: initial;
  border-radius: 3px;
`
