import React from 'react';
import { TextLink } from '@fxtrot/edge';

import { useToLanguage, useText } from '../AppContext';
import { getTranslatorLink } from '../../utils';

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
