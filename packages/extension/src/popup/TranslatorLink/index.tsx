import React from 'react';
import { TextLink, StyleRecord } from '@fxtrot/ui';

import { getTranslatorLink } from '../../utils';
import { useTranslation, useText } from '../store/utils';

const style: StyleRecord = { css: { fontWeight: 400 } };

export const TranslatorLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<'a'>
>(({ children, ...props }, ref) => {
  const href = useTranslatorLink();

  return (
    <TextLink
      href={href}
      target="_blank"
      rel="noopener"
      css={style}
      {...props}
      ref={ref}
    >
      {children}
    </TextLink>
  );
});

export function useTranslatorLink() {
  const { to, from } = useTranslation();
  const [text] = useText();

  return getTranslatorLink({ to, from, text });
}
