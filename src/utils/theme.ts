import * as Color from 'color'
import { merge } from 'glamor'

import { sectionHeading, highlightedText } from './mixins'

export const breakpoints = {
  xs: '@media (min-width: 0)',
  sm: '@media (min-width: 576px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)'
}

export const widths = {
  normal: '750px',
  large: '970px',
  xlarge: '1140px'
}

export const heights = {
  masthead: '75px'
}

export const fonts = {
  sansSerif: `"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif`,
  serif: `"Zilla Slab", Georgia, "Times New Roman", Times, serif`,
  monospace: `Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
}

export const photonColors = {
  blue40: '#45a1ff',
  blue50: '#0a84ff',
  blue60: '#0060df',
  blue70: '#003eaa',
  blue80: '#002275',
  blue90: '#000f40',
  teal50: '#00feff',
  teal60: '#00c8d7',
  teal70: '#008ea4',
  teal80: '#005a71',
  teal90: '#002d3e',
  magenta50: '#ff1ad9',
  magenta60: '#ed00b5',
  magenta70: '#b5007f',
  magenta80: '#7d004f',
  magenta90: '#440027',
  green50: '#30e60b',
  green60: '#12bc00',
  green70: '#058b00',
  green80: '#006504',
  green90: '#003706',
  yellow50: '#ffe900',
  yellow60: '#d7b600',
  yellow70: '#a47f00',
  yellow80: '#715100',
  yellow90: '#3e2800',
  red50: '#ff0039',
  red60: '#d70022',
  red70: '#a4000f',
  red80: '#5a0002',
  red90: '#3e0200',
  purple50: '#9400ff',
  purple60: '#8000d7',
  purple70: '#6200a4',
  purple80: '#440071',
  purple90: '#25003e',
  orange50: '#ff9400',
  orange60: '#d76e00',
  orange70: '#a44900',
  orange80: '#712b00',
  orange90: '#3e1300',
  ink70: '#363959',
  ink80: '#202340',
  ink90: '#0f1126',
  grey10: '#f9f9fa',
  grey20: '#ededf0',
  grey30: '#d7d7db',
  grey40: '#b1b1b3',
  grey50: '#737373',
  grey60: '#4a4a4f',
  grey70: '#38383d',
  grey80: '#2a2a2e',
  grey90: '#0c0c0d',
  white: '#ffffff',
}

export const colors = {
  // Primary colours
  white: '#fff',
  black: '#000',

  // Secondary colours
  blue1: '#33525d',
  blue2: '#558194',
  blue3: '#88d1f1',
  blue4: '#c3e8f8',
  orange1: '#5e4812',
  orange2: '#c89631',
  orange3: '#f8b83e',
  orange4: '#fadb8c',
  red1: '#5d3739',
  red2: '#c07578',
  red3: '#fb8e92',
  red4: '#fdc6c8',
  purple1: '#454653',
  purple2: '#9194b0',
  purple3: '#b0b4e5',
  purple4: '#d7d9f2',
  green1: '#434f12',
  green2: '#6d7c23',
  green3: '#b7d43f',
  green4: '#dbea8e',

  // Tertiary colors
  gray1: '#646363',
  gray2: '#9d9d9c',
  gray3: '#d0d0d0',
  neonblue1: '#3dfefd',
  neonblue2: '#229d9a',
  neonblue3: '#116362',
  neongreen1: '#aefb4a',
  neongreen2: '#6b9b2b',
  neongreen3: '#44611a',
  neonpurple1: '#f793fb',
  neonpurple2: '#ca78cc',
  neonpurple3: '#603861',
  yellow: '#feed01'
}

// Colours for the header background to cycle by random

export const headerColors = [
  photonColors.blue50,
  photonColors.blue60,
  photonColors.blue70,
  photonColors.blue80,
  photonColors.green50,
  photonColors.green60,
  photonColors.green70,
  photonColors.ink70,
  photonColors.ink80,
  photonColors.ink90,
  photonColors.magenta60,
  photonColors.magenta70,
  photonColors.magenta80,
  photonColors.orange50,
  photonColors.orange60,
  photonColors.orange70,
  photonColors.purple50,
  photonColors.purple60,
  photonColors.purple70,
  photonColors.purple80,
  photonColors.red70,
  photonColors.red80,
  photonColors.red90,
  photonColors.teal50,
  photonColors.teal60,
  photonColors.teal70,
  photonColors.yellow50,
  photonColors.yellow60,
  photonColors.yellow70,
  photonColors.yellow80,
]

export const borderColors = [
  photonColors.blue70,
  photonColors.green70,
  photonColors.grey70,
  photonColors.ink70,
  photonColors.magenta70,
  photonColors.orange70,
  photonColors.purple70,
  photonColors.red70,
  photonColors.teal70,
  photonColors.yellow70
]

export const getBorderColor = borderColors[Math.floor(Math.random() * borderColors.length)]

export const linkStyle = {
  color: photonColors.blue60,
  textDecoration: 'underline',

  ':hover, :focus': {
    color: photonColors.blue70,
  },

  [breakpoints.md]: {
    textDecoration: 'none',

    ':hover, :focus': {
      textDecoration: 'underline',
    }
  }
}

export const headingStyle = {
  marginTop: '1.414rem',
  marginBottom: '.5rem',
  fontFamily: `"Zilla Slab", Georgia, "Times New Roman", Times, serif`,
  fontWeight: 600,
  lineHeight: 1.2,
  color: photonColors.grey90,
  textRendering: 'optimizeLegibility'
}

export const sharedStyles = {
  link: linkStyle,

  heading: headingStyle,

  pageTitle: {
    margin: '0 !important',
    '& span': merge(sectionHeading(photonColors.white, '.25rem', '.5rem'), {
      color: photonColors.grey90
    })
  },

  sectionFooterLink: {
    display: 'inline-block',
    marginTop: 'auto',
    padding: '.25rem .5rem',
    color: photonColors.blue60,
    border: `2px solid ${photonColors.blue60}`,

    '&:hover, &:focus': {
      color: photonColors.white,
      borderColor: photonColors.blue70,
      backgroundColor: photonColors.blue70,
      textDecoration: 'none'
    }
  },

  base: {
    color: photonColors.grey70,
    backgroundColor: photonColors.white,

    '& table': {
      marginBottom: '1rem',
      width: '100%',
      fontSize: '85%',
      border: `1px solid ${photonColors.grey20}`,
      borderCollapse: 'collapse'
    },

    '& td, & th': {
      padding: '.25rem .5rem',
      border: `1px solid ${photonColors.grey20}`
    },

    '& th': {
      textAlign: 'left'
    },

    '& tbody tr:nth-child(odd) td, & tbody tr:nth-child(odd) th': {
      backgroundColor: photonColors.grey10
    },

    // Headings mainly follow the typography scaling guidelines outlined here:
    // http://type-scale.com/

    '& h1, & h2, & h3, & h4, & h5, & h6': headingStyle,

    '& h1': {
      fontSize: '2.074rem',

      [breakpoints.md]: {
        fontSize: '2.441rem'
      },

      [breakpoints.lg]: {
        fontSize: '3.157rem'
      }
    },

    '& h2': {
      fontSize: '1.728rem',

      [breakpoints.md]: {
        fontSize: '1.953rem'
      },

      [breakpoints.lg]: {
        fontSize: '2.369rem'
      }
    },

    '& h3': {
      fontSize: '1.44rem',

      [breakpoints.md]: {
        fontSize: '1.563rem'
      },

      [breakpoints.lg]: {
        fontSize: '1.777rem'
      }
    },

    '& h4, & h5, & h6': {
      fontSize: '1.2rem',

      [breakpoints.md]: {
        fontSize: '1.25rem'
      },

      [breakpoints.lg]: {
        fontSize: '1.333rem'
      }
    },

    '& p': {
      margin: '0 0 1rem'
    },

    '& small': {
      fontSize: '.75rem'
    },

    '& strong': {
      color: photonColors.grey90
    },

    '& ul, & ol, & dl': {
      marginTop: 0,
      marginBottom: '1rem'
    },

    '& dt': {
      fontWeight: 'bold'
    },

    '& dd': {
      marginLeft: 0,
      marginBottom: '.5rem'
    },

    '& hr': {
      position: 'relative',
      margin: '1.5rem 0',
      border: 0,
      borderBottom: `1px solid ${photonColors.grey30}`
    },

    '& abbr': {
      fontSize: '85%',
      fontWeight: 'bold',

      '&[title]': {
        cursor: 'help',
        borderBottom: `1px dotted ${photonColors.grey30}`
      }
    },

    '& blockquote': {
      padding: '.5rem 1rem',
      margin: '.8rem 0',
      color: photonColors.grey50,
      borderLeft: `.25rem solid ${photonColors.grey20}`,

      '& p:last-child': {
        marginBottom: 0,
      },

      [breakpoints.sm]: {
        paddingRight: '5rem',
        paddingLeft: '1.25rem'
      }
    },

    '& code': {
      padding: '0 .25em',
      fontSize: '90%',
      color: photonColors.red50,
      backgroundColor: photonColors.grey10,
      borderRadius: '3px',
    },

    '& pre': {
      marginTop: 0,
      marginBottom: '1rem',
      overflowX: 'auto',
    },

    '& pre code': {
      padding: 0,
      fontSize: '100%',
      color: 'inherit',
      backgroundColor: 'transparent'
    }
  },

  markdown: {
    marginTop: '3rem',

    '& a': linkStyle,

    '& figure': {
      margin: '2rem 0',
      textAlign: 'center',
      backgroundColor: photonColors.grey70,
      border: `8px solid ${photonColors.grey70}`,

      [breakpoints.lg]: {
        margin: '2rem',
      },

      '& img': {
        display: 'block',
        verticalAlign: 'middle',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 0
      },

      '& figcaption': {
        '& a': {
          color: photonColors.blue40,

          '&:hover, &:focus': {
            color: photonColors.blue50
          }
        },

        '&:last-child': {
          paddingTop: '8px',
          color: photonColors.white,
          backgroundColor: photonColors.grey70
        }
      }
    },

    '& li + li': {
      marginTop: '.25rem',
    },

    '& .gatsby-highlight': {
      margin: '1rem 0',
      fontSize: '85%'
    },

    '& .post-subtitle, & .page-subtitle': {
      margin: '3rem 0',
      padding: '1rem 0',
      borderTop: `4px solid ${getBorderColor}`,
      borderBottom: `4px solid ${getBorderColor}`,
      fontSize: '1.25rem',
      fontWeight: 300,

      [breakpoints.sm]: {
        width: '75%',
        fontSize: '1.5rem'
      }
    },

    '& .message': {
      marginBottom: '1rem',
      padding: '1rem',
      color: Color(colors.black).lighten(0.25).hex(),
      backgroundColor: Color(colors.white).darken(0.05).hex(),

      '& p:last-child': {
        marginBottom: 0
      }
    },

    // Markdown footnotes
    '& a[href^="#fn-"], & a[href^="#fnref-"]': {
      display: 'inline-block',
      marginLeft: '.1rem',
      fontWeight: 'bold'
    },

    // List of footnotes
    '& .footnotes': {
      marginTop: '2rem',
      fontSize: '85%',

      '& li[id^="fn-"]': {
        '& p': {
          // Remark for some reason puts the footnote reflink *after* the `p` tag.
          display: 'inline'
        }
      }
    },

    // Extend paragraphs with `.lead` for larger introductory text.
    '& .lead': {
      fontSize: '1.25rem',
      fontWeight: 300,

      [breakpoints.md]: {
        fontSize: '1.5rem',
      }
    }
  }
}
