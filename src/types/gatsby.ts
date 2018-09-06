import { SiteAuthor } from './default'

export interface SiteMetadata {
  title: string
  tagline: string
  description: string
  siteUrl: string
  flavourText?: string
  author: SiteAuthor
}

export interface HCardIcon {
  childImageSharp: ChildImageSharp
}

export interface HeaderImage {
  childImageSharp: ChildImageSharp
}

export interface ChildImageSharp {
  fluid: Fluid
}

export interface Fluid {
  base64: string
  tracedSVG: string
  aspectRatio: number
  src: string
  srcSet: string
  srcWebp: string
  srcSetWebp: string
  sizes: string
  originalImg: string
  originalName: string
}
