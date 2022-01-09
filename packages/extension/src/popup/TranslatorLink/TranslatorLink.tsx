import React from 'react';
import { TextLink } from '@fxtrot/ui';

import { getTranslatorLink } from '../utils';
import { useFromLanguage, useInputText, useToLanguage } from '../atoms';

export const TranslatorLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'>
>(({ children, ...props }, ref) => {
  const href = useTranslatorLink();

  return (
    <TextLink
      href={href}
      css={{ fontWeight: 400, color: '$text' }}
      external
      {...props}
      ref={ref}
    >
      {children}
    </TextLink>
  );
});

export function useTranslatorLink() {
  const [to] = useToLanguage();
  const [from] = useFromLanguage();
  const [text] = useInputText();

  return getTranslatorLink({ to, from, text });
}
