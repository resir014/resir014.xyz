import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../styles/variables'

interface ColorSwatchProps {
  color: string
  title?: string
  darkText?: boolean
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, title, darkText }) => {
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
        {copySuccess ? copySuccess : title || color}
      </Inner>
    </Root>
  )
}

ColorSwatch.defaultProps = {
  title: undefined,
  darkText: false
}

const Inner = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 76px;
  width: 76px;
  color: ${(props: ColorSwatchProps) => (props.darkText ? colors.black : colors.white)};
  font-size: 12px;
  background: ${(props: ColorSwatchProps) => props.color};
  border: 1px solid transparent;
  border-radius: 3px;
  transition: all 0.3s ease;
`

const Root = styled('button')`
  display: inline-block;
  width: 92px;
  margin: 0;
  margin-top: 1rem;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background: none;
  background-color: ${colors.grey90};
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;

  &:hover,
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px 0px;
  }

  &:focus {
    outline: none;

    > div {
      opacity: 0.7;
    }
  }
`
