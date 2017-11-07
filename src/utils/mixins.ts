import { breakpoints } from './theme'

export const clearfix = {
  '&:before, &:after': {
    content: ' ',
    display: 'table',
  },
  '&:after': {
    clear: 'both'
  }
}

export const highlightedText = (
  background: any,
  verticalPad: string | number = 0,
  horizontalPad: string | number = '.5rem'
) => ({
  display: 'inline-block',
  padding: `${verticalPad} ${horizontalPad}`,
  backgroundColor: background,
})

// 1. Negative margin is applied according to the container margin to
//    ensure the content aligns cleanly
// 2. Positive padding on the left side to counter the negative margin for that
//    distinct box effect
// 3. Different right padding for larger screens
export const sectionHeading = (background: any, verticalPad: string | number = 0, horizontalPad: string | number = '.5rem') => ({
  display: 'inline-block',
  margin: 0,
  padding: `${verticalPad} ${horizontalPad}`, // 2
  backgroundColor: background,
})
