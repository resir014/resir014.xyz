import styled from '@emotion/styled'
import css from '@emotion/css'
import { colors } from '../../styles/variables'

interface BadgeProps {
  className?: string
  style?: React.CSSProperties
  color?: 'green' | 'blue' | 'red' | 'white'
}

const Badge: React.FC<BadgeProps> = ({ children, className, style }) => (
  <span className={className} style={style}>
    {children}
  </span>
)

Badge.defaultProps = {
  className: undefined,
  style: undefined,
  color: 'white'
}

const WhiteColorStyles = css`
  color: #202340;
  background-color: #d7d7db;
`

const GreenColorStyles = css`
  color: ${colors.white};
  background-color: ${colors.green30};
`

export default styled<'span', BadgeProps>('span')`
  display: inline-block;
  padding: 0.25em 0.5em;
  font-size: 85%;
  color: #202340;
  background-color: #d7d7db;
  border-radius: 3px;

  ${props => props.color === 'white' && WhiteColorStyles}
  ${props => props.color === 'green' && GreenColorStyles}
`
