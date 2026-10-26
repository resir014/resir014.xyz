import * as React from 'react';
import { messageBoxClassName, type MessageBoxVariant } from './message-box-class-name';

export interface MessageBoxProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  variant?: MessageBoxVariant;
  children?: React.ReactNode;
}

export const MessageBox = React.forwardRef<HTMLDivElement, MessageBoxProps>(
  ({ className, children, variant = 'default', ...rest }, ref) => {
    return (
      <div ref={ref} className={messageBoxClassName(variant, className)} {...rest}>
        {children}
      </div>
    );
  }
);

MessageBox.displayName = 'MessageBox';
