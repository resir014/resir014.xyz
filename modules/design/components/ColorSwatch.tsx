import React from 'react'
import styled from '@emotion/styled'
import { colors, shadows } from '@resir014/chungking-core'

interface ColorSwatchProps {
  color: string
  title?: string
  darkText?: boolean
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, title, darkText }) => {
  const [copySuccess, setCopySuccess] = React.useState<string | undefined>(undefined)

  function copyToClipboard(str: string) {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      const el = document.createElement('textarea')
      el.defaultValue = ''
      el.value = str
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)

      const selection = document.getSelection()

      if (selection) {
        const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)

        if (selected) {
          selection.removeAllRanges()
          selection.addRange(selected)
        }

        setCopySuccess('Copied!')
        setTimeout(() => setCopySuccess(undefined), 3000)
      }
    }
  }

  return (
    <Root type="button" onClick={copyToClipboard(color)}>
      <Inner color={color} darkText={darkText}>
        {copySuccess || title || color}
      </Inner>
    </Root>
  )
}

export default ColorSwatch

ColorSwatch.defaultProps = {
  title: undefined,
  darkText: false
}

const Inner = styled('div')<ColorSwatchProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 76px;
  width: 76px;
  color: ${(props) => (props.darkText ? colors.black : colors.white)};
  font-size: 12px;
  background: ${(props) => props.color};
  border: 1px solid transparent;
  border-radius: 3px;
  transition: all 0.3s ease;
`

const Root = styled('button')`
  display: inline-block;
  width: 92px;
  margin: 0;
  margin-right: 24px;
  margin-bottom: 24px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background: none;
  background-color: ${colors.grey[900]};
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: ${shadows.single};

  &:hover,
  &:focus {
    box-shadow: ${shadows.double};
  }

  &:focus {
    outline: none;

    > div {
      opacity: 0.7;
    }
  }
`
