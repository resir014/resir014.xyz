import * as React from 'react'
import * as classnames from 'classnames'

const styles = require('./styles.module.scss')

export interface SocialLinkNode {
  node: {
    title: string
    url: string
    description: string
  }
}

export interface SocialLinksProps {
  links: SocialLinkNode[]
}

const SocialLink: React.SFC<SocialLinkNode> = ({ node }) => (
  <div>
    <h3>
      <a
        className={styles.socialLink}
        href={node.url}
        target="_blank"
        rel="noopener"
      >
        {node.title}
      </a>
    </h3>
    <p>{node.description}</p>
  </div>
)

const SocialLinks: React.SFC<SocialLinksProps> = ({ links }) => (
  <div className={classnames(styles.root, 'container')}>
    <h2 className={styles.sectionTitle}>Get in touch</h2>
    {links.map(({ node }) => <SocialLink key={node.title} node={node} />)}
  </div>
)

export default SocialLinks
