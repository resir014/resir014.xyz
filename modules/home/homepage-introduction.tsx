import * as React from 'react';
import { Container } from '~/components/layout';

export interface HomepageIntroductionProps extends React.ComponentPropsWithoutRef<'section'> {
  className?: string;
  style?: React.CSSProperties;
}

export const HomepageIntroduction = React.forwardRef<HTMLDivElement, HomepageIntroductionProps>(
  ({ className, style, ...rest }, ref) => {
    return (
      <section ref={ref} className={className} style={style} {...rest}>
        <Container size="sm">
          <p className="font-light text-xl lg:text-2xl">
            Hey there, I&apos;m Resi! I&apos;m a self-taught web developer based in Jakarta,
            Indonesia. I aim to blur the line between high-performance engineering and good design.
          </p>
        </Container>
      </section>
    );
  }
);

HomepageIntroduction.displayName = 'HomepageIntroduction';
