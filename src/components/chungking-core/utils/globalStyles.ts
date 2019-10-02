import { css } from '@emotion/core'
import { fonts, colors } from './variables'

const GlobalStyles = css`
  html {
    height: 100%;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  a {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    position: relative;
    min-height: 100%;
    margin: 0;
    font-family: ${fonts.sansSerif};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    color: ${colors.grey10};
    background-color: ${colors.black};
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  img {
    display: block;
    max-width: 100%;
    margin: 0 0 1rem;
  }

  figure {
    margin: 2rem 0;
  }

  figcaption {
    font-size: 80%;
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
    border: 1px solid ${colors.grey20};
    border-collapse: collapse;

    td,
    th {
      padding: 0.25rem 0.5rem;
      border: 1px solid ${colors.grey20};
    }

    th {
      text-align: left;
    }

    tbody tr:nth-child(odd) td,
    tbody tr:nth-child(odd) th {
      background-color: ${colors.grey10};
    }
  }

  small {
    font-size: 0.75rem;
  }

  strong {
    color: ${colors.white};
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }

  hr {
    position: relative;
    margin: 1.5rem 0;
    border: 0;
    border-bottom: 1px solid ${colors.grey30};
  }

  abbr {
    font-size: 85%;
    font-weight: bold;

    &[title] {
      cursor: help;
      border-bottom: 1px dotted ${colors.grey30};
    }
  }

  .hidden {
    display: none;
  }

  .responsive-embed {
    position: relative;
    padding-top: 25px;
    padding-bottom: 56.25%;
    height: 0;

    div,
    embed,
    object {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
`

export default GlobalStyles
