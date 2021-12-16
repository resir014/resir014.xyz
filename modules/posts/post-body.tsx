import * as React from 'react'
import clsx from 'clsx'
import CSS from 'csstype'
import convert from 'htmr'
import { Anchor, Box, MessageBox, Paragraph, Space } from '@resir014/chungking-react'

import { Container, ContainerSizes } from '~/components/layout'
import { SyndicationFormat } from '~/types/default'
import { LI, UL } from '../markdown'

interface PostBodyProps {
  content?: string
  containerSize?: ContainerSizes
  syndication?: SyndicationFormat[]
  spacing?: Space | CSS.Property.Margin
}

const PostBody: React.FC<PostBodyProps> = ({ content, syndication, containerSize = 'md', children }) => {
  const renderSyndication = () => {
    if (syndication) {
      return (
        <MessageBox mb="lg">
          <Paragraph mb="xs">This post is also published on:</Paragraph>
          <UL>
            {syndication.map((item) => (
              <LI>
                <Anchor href={item.url} target="_blank" className="u-syndication" rel="noopener noreferrer external syndication">
                  {item.name}
                </Anchor>
              </LI>
            ))}
          </UL>
        </MessageBox>
      )
    }

    return null
  }

  if (content) {
    return (
      <Box as="section" px="lg" pt={64} pb={96}>
        <Container size={containerSize}>
          {renderSyndication()}
          <div className="e-content mx-auto prose prose-base lg:prose-lg prose-invert">
            {convert(content, {
              transform: {
                pre: ({ className, ...rest }: JSX.IntrinsicElements['pre']) => (
                  <pre className={clsx('rounded-lg drop-shadow-lg overflow-hidden lg:-mx-12', className)} {...rest} />
                ),
                figure: ({ className, ...rest }: JSX.IntrinsicElements['figure']) => (
                  <figure className={clsx('space-y-2 text-center lg:-mx-12', className)} {...rest} />
                ),
                figcaption: ({ className, ...rest }: JSX.IntrinsicElements['figcaption']) => (
                  <figcaption className={clsx('text-sm', className)} {...rest} />
                ),
                img: ({ className, alt, ...rest }: JSX.IntrinsicElements['img']) => (
                  <img className={clsx('mx-auto rounded-lg drop-shadow-lg bg-chungking-grey-800', className)} alt={alt} {...rest} />
                )
              }
            })}
          </div>
        </Container>
      </Box>
    )
  }

  return (
    <Box as="section" p="lg" pb={96}>
      <Container size={containerSize}>
        {renderSyndication()}
        <div className="e-content mx-auto">{children}</div>
      </Container>
    </Box>
  )
}

export default PostBody
