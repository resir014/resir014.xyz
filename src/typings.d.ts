// graphql query strings
declare const graphql: (query: TemplateStringsArray) => void

interface CSSModule {
  [className: string]: string
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}

// module shims

declare module 'gatsby-image' {
  interface GatsbyImageProps {
    resolutions?: {[key: string]: any}
    sizes?: {[key: string]: any}
    fadeIn?: boolean
    title?: string
    alt?: string
    className?: string
    outerWrapperClassName?: string
    style?: React.CSSProperties
    position?: string
    backgroundColor?: string | boolean
    onLoad?: () => any
  }

  export default class Img extends React.Component<GatsbyImageProps> {}
}
