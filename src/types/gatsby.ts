import { FluidObject, FixedObject } from 'gatsby-image'
import { SiteAuthor } from './default'

export type Fluid = FluidObject
export type Fixed = FixedObject
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
