import React from 'react';
import { TextLink, StyleRecord } from '@fxtrot/ui';

import { getTranslatorLink } from '../../utils';
import { useToLanguage, useText } from '../store/utils';

const style: StyleRecord = { css: { fontWeight: 400 } };

const TranslatorLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof TextLink>
>(({ children, ...props }, ref) => {
  const [to] = useToLanguage();
  const [text] = useText();

  return (
    <TextLink
      href={getTranslatorLink({ to, text })}
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

export default TranslatorLink;
