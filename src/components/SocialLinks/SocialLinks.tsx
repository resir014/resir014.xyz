import * as React from 'react'
import * as classnames from 'classnames'

import SocialLink from './SocialLink/SocialLink'
import { SocialLinkNode } from './types'

import * as styles from './SocialLinks.module.scss'

export interface SocialLinksProps {
  links: SocialLinkNode[]
}

const SocialLinks: React.SFC<SocialLinksProps> = ({ links }) => (
  <div className={classnames(styles.root)}>
    <h2 className={styles.sectionTitle}>Get in touch</h2>
    {links.map(({ node }) => <SocialLink key={node.title} node={node} />)}
  </div>
)

export default SocialLinks
