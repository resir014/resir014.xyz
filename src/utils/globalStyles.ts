import { injectGlobal, css } from 'styled-components'
import { photonColors, fonts } from './theme'
import mediaQueries from './mediaQueries'

export const createLinkStyle = (color: string = photonColors.blue60, hoverColor: string = photonColors.blue70) =>
css`
  color: ${photonColors.blue60};
  text-decoration: underline;

  &:hover, &:focus {
    color: ${photonColors.blue70};
  }

  @media ${mediaQueries.md} {
    text-decoration: none;

    &:hover, &:focus {
      text-decoration: underline;
    }
  }
`

export const highlightedText = (
  background: any,
  verticalPad: string | number = 0,
  horizontalPad: string | number = '.5rem'
) => css`{
  margin: 0;
  padding: ${verticalPad} ${horizontalPad};
  background-color: ${background};
  box-decoration-break: clone;
}`

// 1. Negative margin is applied according to the container margin to
//    ensure the content aligns cleanly
// 2. Positive padding on the left side to counter the negative margin for that
//    distinct box effect
// 3. Different right padding for larger screens
export const sectionHeading = (background: any, verticalPad: string | number = 0, horizontalPad: string | number = '.5rem') => css`{
  display: inline-block;
  margin: 0;
  padding: ${verticalPad} ${horizontalPad};
  background-color: ${background};
}`

export default () => injectGlobal`
html {
  font-family: ${fonts.sansSerif};
}

body {
  color: ${photonColors.grey70};
  background-color: ${photonColors.white};
}

code,
pre {
  font-family: ${fonts.monospace};
}

#___gatsby {
  height: 100% !important;
}

table {
  margin-bottom: 1rem;
  width: 100%;
  font-size: 85%;
  border: 1px solid ${photonColors.grey20};
  border-collapse: collapse;

  td, th {
    padding: .25rem .5rem;
    border: 1px solid ${photonColors.grey20};
  }

  th {
    text-align: left;
  }

  tbody tr:nth-child(odd) td,
  tbody tr:nth-child(odd) th {
    background-color: ${photonColors.grey10};
  }
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 1.414rem;
  margin-bottom: .5rem;
  font-family: "Zilla Slab", Georgia, "Times New Roman", Times, serif;
  font-weight: 600;
  line-height: 1.2;
  color: ${photonColors.grey90};
  text-rendering: optimizeLegibility;
}

h1 {
  font-size: 2.074rem;

  @media ${mediaQueries.md} {
    font-size: 2.441rem;
  }

  @media ${mediaQueries.lg} {
    font-size: 3.157rem;
  }
}

h2 {
  font-size: 1.728rem;

  @media ${mediaQueries.md} {
    font-size: 1.953rem;
  }

  @media ${mediaQueries.lg} {
    font-size: 2.369rem;
  }
}

h3 {
  font-size: 1.44rem;

  @media ${mediaQueries.md} {
    font-size: 1.563rem;
  }

  @media ${mediaQueries.lg} {
    font-size: 1.777rem;
  }
}

h4, h5, h6 {
  font-size: 1.2rem;

  @media ${mediaQueries.md} {
    font-size: 1.25rem;
  }

  @media ${mediaQueries.lg} {
    font-size: 1.333rem;
  }
}

p {
  margin: 0 0 1rem;
}

small {
  font-size: .75rem;
}

strong {
  color: ${photonColors.grey90};
}

ul, ol, dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

dt {
  font-weight: bold;
}

dd {
  margin-left: 0;
  margin-bottom: .5rem;
}

hr {
  position: relative;
  margin: 1.5rem 0;
  border: 0,
  border-bottom: 1px solid ${photonColors.grey30};
}

abbr {
  font-size: 85%;
  font-weight: bold;

  &[title] {
    cursor: help;
    border-bottom: 1px dotted ${photonColors.grey30};
  }
}

blockquote {
  padding: .5rem 1rem;
  margin: .8rem 0;
  color: ${photonColors.grey50};
  borderLeft: .25rem solid ${photonColors.grey20};

  p:last-child {
    margin-bottom: 0;
  }

  @media ${mediaQueries.sm} {
    padding-right: 5rem;
    padding-left: 1.25rem;
  }
}

code {
  padding: 0 .25em;
  font-size: 90%;
  color: ${photonColors.red50};
  background-color: ${photonColors.grey10};
  border-radius: 3px;
}

pre {
  margin-top: 0
  margin-bottom: 1rem;
  overflow-x: auto;
}

pre code {
  padding: 0
  font-size: 100%;
  color: inherit;
  background-color: transparent;
}
`
