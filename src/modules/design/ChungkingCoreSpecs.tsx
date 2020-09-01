import * as React from 'react'

import { ColorSwatch } from '../../components/design'
import {
  Text,
  Heading,
  Badge,
  MessageBox,
  Button,
  AnchorButton,
  colors,
  Card,
  Anchor
} from '../../components/chungking-core'
import { P, UL, OL, LI, H2, H3, H4, InlineCode, Blockquote, Small } from '../../components/markdown'
import WrapperRoot from './WrapperRoot'
import { NavLinkButton } from '../../components/ui'

const buttonWrapperStyles: React.CSSProperties = {
  paddingRight: '16px'
}

const buttonMarginStyles: React.CSSProperties = {
  margin: '8px'
}

const ChungkingCoreSpecs: React.FC = () => {
  return (
    <>
      <H2>Core Components</H2>
      <H3>Colors</H3>
      <H4>Primary</H4>
      <ColorSwatch color={colors.white} darkText />
      <ColorSwatch color={colors.black} />
      <H4>Secondary</H4>
      <ColorSwatch color={colors.grey10} darkText />
      <ColorSwatch color={colors.grey20} darkText />
      <ColorSwatch color={colors.grey30} darkText />
      <ColorSwatch color={colors.grey40} darkText />
      <ColorSwatch color={colors.grey50} />
      <ColorSwatch color={colors.grey60} />
      <ColorSwatch color={colors.grey70} />
      <ColorSwatch color={colors.grey80} />
      <ColorSwatch color={colors.grey90} />

      <H3>Accent Colors</H3>
      <H4>Magenta</H4>
      <ColorSwatch color={colors.magenta20} />
      <ColorSwatch color={colors.magenta30} />
      <ColorSwatch color={colors.magenta40} />
      <H4>Red</H4>
      <ColorSwatch color={colors.red20} />
      <ColorSwatch color={colors.red30} />
      <ColorSwatch color={colors.red40} />
      <H4>Orange</H4>
      <ColorSwatch color={colors.orange20} darkText />
      <ColorSwatch color={colors.orange30} darkText />
      <ColorSwatch color={colors.orange40} darkText />
      <H4>Green</H4>
      <ColorSwatch color={colors.green20} darkText />
      <ColorSwatch color={colors.green30} darkText />
      <ColorSwatch color={colors.green40} darkText />
      <H4>Purple</H4>
      <ColorSwatch color={colors.purple20} />
      <ColorSwatch color={colors.purple30} />
      <ColorSwatch color={colors.purple40} />
      <H4>Blue</H4>
      <ColorSwatch color={colors.blue20} />
      <ColorSwatch color={colors.blue30} />
      <ColorSwatch color={colors.blue40} />
      <H4>Ultramarine</H4>
      <ColorSwatch color={colors.ultramarine20} />
      <ColorSwatch color={colors.ultramarine30} />
      <ColorSwatch color={colors.ultramarine40} />

      <H3>Typography</H3>
      <H4>Heading</H4>
      <WrapperRoot>
        <Heading variant={900} my="md">
          Heading - 900
        </Heading>
        <Heading variant={800} my="md">
          Heading - 800
        </Heading>
        <Heading variant={700} my="md">
          Heading - 700
        </Heading>
        <Heading variant={600} my="md">
          Heading - 600
        </Heading>
        <Heading variant={500} my="md">
          Heading - 500
        </Heading>
        <Heading variant={400} my="md">
          Heading - 400
        </Heading>
        <Heading variant={300} my="md">
          Heading - 300
        </Heading>
        <Heading variant={200} my="md">
          Heading - 200
        </Heading>
        <Heading variant={100} my="md">
          Heading - 100
        </Heading>
      </WrapperRoot>
      <H4>Text</H4>
      <WrapperRoot>
        <Text variant={900} display="block" my="sm">
          Text - 900
        </Text>
        <Text variant={800} display="block" my="sm">
          Text - 800
        </Text>
        <Text variant={700} display="block" my="sm">
          Text - 700
        </Text>
        <Text variant={600} display="block" my="sm">
          Text - 600
        </Text>
        <Text variant={500} display="block" my="sm">
          Text - 500
        </Text>
        <Text variant={400} display="block" my="sm">
          Text - 400
        </Text>
        <Text variant={300} display="block" my="sm">
          Text - 300
        </Text>
        <Text variant={200} display="block" my="sm">
          Text - 200
        </Text>
        <Text variant={100} display="block" my="sm">
          Text - 100
        </Text>
      </WrapperRoot>
      <H4>Monospace</H4>
      <WrapperRoot>
        <Text variant={400} display="block" fontFamily="monospace" fontWeight={400}>
          Text - 400 - Monospace - Regular
        </Text>
        <Text variant={400} display="block" fontFamily="monospace" fontWeight={700}>
          Text - 400 - Monospace - Bold
        </Text>
      </WrapperRoot>
      <H4>Anchor</H4>
      <WrapperRoot>
        <Anchor
          href="https://www.youtube.com/watch?v=lZ8bfsL-awY"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Anchor>
      </WrapperRoot>
      <H4>Paragraph</H4>
      <WrapperRoot>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio natus in
          incidunt quas totam enim laborum, facilis ipsam, sunt odio accusamus doloribus eaque
          dolorem nisi iusto reprehenderit possimus optio.
        </P>
        <P>
          <Small>
            Sequi iste quas optio natus odit nostrum nobis atque, quidem repudiandae sunt repellat.
            Corrupti magni ipsum quasi et ex. Rem, eum. Officia fugiat alias magnam voluptatum
            temporibus minus voluptatem eos?
          </Small>
        </P>
      </WrapperRoot>
      <H4>Unordered List</H4>
      <WrapperRoot>
        <UL>
          <LI>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, id!</LI>
          <LI>Quasi quis ad deleniti sint. Similique ipsa quas debitis adipisci?</LI>
          <LI>Nemo saepe quia odio impedit esse. Minus dignissimos ipsa delectus.</LI>
        </UL>
      </WrapperRoot>
      <H4>Ordered List</H4>
      <WrapperRoot>
        <OL>
          <LI>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, id!</LI>
          <LI>Quasi quis ad deleniti sint. Similique ipsa quas debitis adipisci?</LI>
          <LI>Nemo saepe quia odio impedit esse. Minus dignissimos ipsa delectus.</LI>
        </OL>
      </WrapperRoot>
      <H4>Inline Code</H4>
      <WrapperRoot>
        <P>
          Run <InlineCode>npm install</InlineCode> to begin the installation process.
        </P>
      </WrapperRoot>
      <H4>Blockquote</H4>
      <WrapperRoot>
        <Blockquote>The quick brown fox jumps over the lazy dog.</Blockquote>
      </WrapperRoot>

      <H3>Components</H3>
      <H4>Badge</H4>
      <WrapperRoot>
        <div style={buttonWrapperStyles}>
          <Badge>default</Badge> <Badge variant="grey">grey</Badge>
        </div>
      </WrapperRoot>
      <H4>Button</H4>
      <WrapperRoot>
        <div style={buttonWrapperStyles}>
          <Button variant="primary" style={buttonMarginStyles}>
            Primary
          </Button>
          <Button variant="primary" disabled style={buttonMarginStyles}>
            Disabled
          </Button>
        </div>
        <div style={buttonWrapperStyles}>
          <Button variant="primary" size="sm" style={buttonMarginStyles}>
            Small
          </Button>
          <Button variant="primary" size="sm" disabled style={buttonMarginStyles}>
            Disabled
          </Button>
        </div>
        <div style={buttonWrapperStyles}>
          <Button variant="primary" size="lg" style={buttonMarginStyles}>
            Large
          </Button>
          <Button variant="primary" size="lg" disabled style={buttonMarginStyles}>
            Disabled
          </Button>
        </div>
        <div style={buttonWrapperStyles}>
          <Button variant="secondary" style={buttonMarginStyles}>
            Secondary
          </Button>
          <Button variant="secondary" disabled style={buttonMarginStyles}>
            Disabled
          </Button>
        </div>
        <div style={buttonWrapperStyles}>
          <Button variant="danger" style={buttonMarginStyles}>
            Danger
          </Button>
          <Button variant="danger" disabled style={buttonMarginStyles}>
            Disabled
          </Button>
        </div>
        <div style={buttonWrapperStyles}>
          <Button ghosted style={buttonMarginStyles}>
            Ghosted
          </Button>
          <Button ghosted disabled style={buttonMarginStyles}>
            Disabled
          </Button>
        </div>
      </WrapperRoot>
      <H4>Card</H4>
      <Card elevation="single" backgroundColor="grey90" p="md">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati tenetur fuga facilis
        ipsam culpa. Perferendis eaque reprehenderit hic, dolore voluptas necessitatibus aliquid
        recusandae, at sunt a eum non, perspiciatis suscipit?
      </Card>
      <H4>NavLinkButton</H4>
      <WrapperRoot>
        <div style={buttonWrapperStyles}>
          <NavLinkButton to="/" variant="primary" style={buttonMarginStyles}>
            Primary
          </NavLinkButton>
          <NavLinkButton to="/" variant="secondary" style={buttonMarginStyles}>
            Secondary
          </NavLinkButton>
          <NavLinkButton to="/" variant="danger" style={buttonMarginStyles}>
            Danger
          </NavLinkButton>
        </div>
      </WrapperRoot>
      <H4>AnchorButton</H4>
      <WrapperRoot>
        <div style={buttonWrapperStyles}>
          <AnchorButton
            href="https://www.youtube.com/watch?v=CWxDq_W85ZQ"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            style={buttonMarginStyles}
          >
            Primary
          </AnchorButton>
          <AnchorButton
            href="https://www.youtube.com/watch?v=CWxDq_W85ZQ"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            style={buttonMarginStyles}
          >
            Secondary
          </AnchorButton>
          <AnchorButton
            href="https://www.youtube.com/watch?v=CWxDq_W85ZQ"
            target="_blank"
            rel="noopener noreferrer"
            variant="danger"
            style={buttonMarginStyles}
          >
            Danger
          </AnchorButton>
        </div>
      </WrapperRoot>
      <H4>Message Box</H4>
      <MessageBox>
        <P m={0}>
          <strong>Info:</strong> This post is also published on{' '}
          <a href="https://medium.com/">Medium</a>.
        </P>
      </MessageBox>
      <MessageBox variant="warning">
        <P m={0}>
          <strong>Update:</strong> Phoenix 1.4 ships with{' '}
          <a href="https://webpack.js.org/">Webpack</a> by default, therefore this guide is now
          outdated.
        </P>
      </MessageBox>
    </>
  )
}

export default ChungkingCoreSpecs
