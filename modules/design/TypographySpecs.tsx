import * as React from 'react'
import { Heading, Text, Anchor, Paragraph } from '@resir014/chungking-react'
import { Blockquote, H2, H3, InlineCode, LI, OL, UL } from '../markdown'
import ComponentSpecimen from './components/ComponentSpecimen'

const variants = [900, 800, 700, 600, 500, 400, 300, 200, 100]

const TypographySpecs: React.FC = () => {
  return (
    <>
      <H2>Typography</H2>
      <H3>Heading</H3>
      <ComponentSpecimen spacing="sm">
        {variants.map((variant) => (
          <Heading key={variant} variant={variant}>
            Heading - {variant}
          </Heading>
        ))}
      </ComponentSpecimen>
      <H3>Text</H3>
      <ComponentSpecimen spacing="sm">
        {variants.map((variant) => (
          <Text key={variant} variant={variant} display="block">
            Text - {variant}
          </Text>
        ))}
      </ComponentSpecimen>
      <H3>Monospace</H3>
      <ComponentSpecimen>
        <Text display="block" fontFamily="monospace">
          Text - 400 - Monospace - Regular
        </Text>
        <Text display="block" fontFamily="monospace" fontWeight={700}>
          Text - 400 - Monospace - Bold
        </Text>
      </ComponentSpecimen>
      <H3>Anchor</H3>
      <ComponentSpecimen>
        <Anchor href="https://www.youtube.com/watch?v=P_mQpbCSQOo" target="_blank" rel="noopener noreferrer">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Anchor>
      </ComponentSpecimen>
      <H3>Paragraph</H3>
      <ComponentSpecimen spacing="md">
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio natus in incidunt quas totam enim laborum, facilis
          ipsam, sunt odio accusamus doloribus eaque dolorem nisi iusto reprehenderit possimus optio. Sequi iste quas optio natus odit
          nostrum nobis atque, quidem repudiandae sunt repellat. Corrupti magni ipsum quasi et ex. Rem, eum. Officia fugiat alias magnam
          voluptatum temporibus minus voluptatem eos?
        </Paragraph>
        <Paragraph variant={300}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores distinctio natus in incidunt quas totam enim laborum, facilis
          ipsam, sunt odio accusamus doloribus eaque dolorem nisi iusto reprehenderit possimus optio. Sequi iste quas optio natus odit
          nostrum nobis atque, quidem repudiandae sunt repellat. Corrupti magni ipsum quasi et ex. Rem, eum. Officia fugiat alias magnam
          voluptatum temporibus minus voluptatem eos?
        </Paragraph>
      </ComponentSpecimen>
      <H2>Markdown</H2>
      <H3>Unordered List</H3>
      <ComponentSpecimen>
        <UL>
          <LI>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, id!</LI>
          <LI>Quasi quis ad deleniti sint. Similique ipsa quas debitis adipisci?</LI>
          <LI>Nemo saepe quia odio impedit esse. Minus dignissimos ipsa delectus.</LI>
        </UL>
      </ComponentSpecimen>
      <H3>Ordered List</H3>
      <ComponentSpecimen>
        <OL>
          <LI>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, id!</LI>
          <LI>Quasi quis ad deleniti sint. Similique ipsa quas debitis adipisci?</LI>
          <LI>Nemo saepe quia odio impedit esse. Minus dignissimos ipsa delectus.</LI>
        </OL>
      </ComponentSpecimen>
      <H3>Inline Code</H3>
      <ComponentSpecimen>
        <Paragraph>
          Run <InlineCode>npm install</InlineCode> to begin the installation process.
        </Paragraph>
      </ComponentSpecimen>
      <H3>Blockquote</H3>
      <ComponentSpecimen>
        <Blockquote>The quick brown fox jumps over the lazy dog.</Blockquote>
      </ComponentSpecimen>
    </>
  )
}

export default TypographySpecs
