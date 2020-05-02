import React from 'react';
import { TextLink } from '@fxtrot/edge';

import { getTranslatorLink } from '../../utils';
import { useToLanguage, useText } from '../store/utils';

const TranslatorLink: React.FC<React.ComponentProps<typeof TextLink>> = ({
  children,
  ...props
}) => {
  const [to] = useToLanguage();
  const [text] = useText();

  return (
    <TextLink
      href={getTranslatorLink({ to, text })}
      target="_blank"
      rel="noopener"
      {...props}
    >
      {children}
    </TextLink>
  );
};

export default TranslatorLink;
