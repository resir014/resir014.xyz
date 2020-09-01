import * as React from 'react'
import classnames from 'clsx'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { Heading, Paragraph, colors, mediaQueries, Box, Text } from '../chungking-core'
import UnstyledLink from '../ui/UnstyledLink'

interface HCardProps {
  className?: string
  hidden?: boolean
}

const HCardAvatar = styled('div')`
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  ${mediaQueries.lg} {
    margin-bottom: 0;
    margin-right: 24px;
    text-align: left;
    justify-content: flex-start;
  }
`

const HCardAvatarImg = styled('img')`
  width: 108px;
  height: 108px;
  margin: 0;
  border-radius: 108px;
  border: 2px solid ${colors.white};
`

const HCardDetails = styled('div')`
  flex: 1;
`

const HCardEmail = styled('span')`
  display: none;
`

const Inner = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: center;

  ${mediaQueries.lg} {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
`

const query = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
          description
          website
          email
          url {
            twitter
            mastodon
            instagram
            tumblr
            github
          }
        }
      }
    }
    icon: file(absolutePath: { regex: "/assets/images/resir014-icon.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const HCard: React.FC<HCardProps> = ({ className, hidden }) => {
  const data = useStaticQuery(query)
  const { author } = data.site.siteMetadata
  const icon = data.icon.childImageSharp

  return (
    <Box
      className={classnames(className, 'h-card')}
      display={hidden ? 'none' : 'block'}
      position="relative"
      color="inherit"
      my="xxl"
    >
      <Inner>
        <HCardAvatar>
          <HCardAvatarImg className="u-photo" src={icon.fluid.src} alt={author.name} />
        </HCardAvatar>
        <HCardDetails>
          <Heading as="h3" variant={900} mt={0} mb="xs">
            <UnstyledLink
              className="p-name"
              rel="me"
              to="/contact"
              aria-describedby="contact-me-text"
              css={css`
                cursor: pointer;

                &::after {
                  content: '';
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                }

                &:hover,
                &:focus {
                  text-decoration: underline;
                }
              `}
            >
              {author.name}
            </UnstyledLink>
          </Heading>
          <Paragraph className="p-note" variant={500} m={0} fontWeight={300}>
            {author.description}
          </Paragraph>
          <HCardEmail className="u-email">{author.email}</HCardEmail>
          <Box
            mt="md"
            css={css`
              word-wrap: break-word;
            `}
          >
            <Text id="contact-me-text" aria-hidden>
              Contact me &rarr;
            </Text>
          </Box>
        </HCardDetails>
      </Inner>
    </Box>
  )
}

export default HCard
