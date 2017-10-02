import * as React from 'react'

import { SocialLinkNode } from '../types'

const styles = require('./SocialLink.module.scss')

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

export default SocialLink
