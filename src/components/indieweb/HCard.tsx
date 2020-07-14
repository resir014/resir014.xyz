import * as React from 'react'
import { transparentize } from 'polished'
import classnames from 'clsx'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import {
  Heading,
  Paragraph,
  colors,
  mediaQueries,
  Box,
  Text,
  UnstyledLink
} from '../chungking-core'

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
    text-align: left;
    justify-content: flex-start;
  }
`

const HCardAvatarImg = styled('img')`
  width: 72px;
  height: 72px;
  margin: 0;
  border-radius: 72px;
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
      p="md"
      backgroundColor={transparentize(0.5, colors.ultramarine30)}
      border="2px solid"
      borderColor="ultramarine30"
      borderRadius={8}
      color="inherit"
      boxShadow="single"
    >
      <Inner>
        <HCardAvatar>
          <HCardAvatarImg className="u-photo" src={icon.fluid.src} alt={author.name} />
        </HCardAvatar>
        <HCardDetails>
          <Heading as="h3" variant={700} mt={0} mb="xs">
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
            mb="sm"
            css={css`
              word-wrap: break-word;
            `}
          >
            <Text id="contact-me-text">Contact me &rarr;</Text>
          </Box>
        </HCardDetails>
      </Inner>
    </Box>
  )
}

export default HCard
