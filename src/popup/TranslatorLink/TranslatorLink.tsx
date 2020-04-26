import React from 'react';
import cx from 'classnames';

import styles from './styles.css';

import { useToLanguage, useText } from '../AppContext';
import { getTranslatorLink } from '../../utils';

const TranslatorLink: React.FC<React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>> = ({ children, className, ...props }) => {
  const [to] = useToLanguage();
  const [text] = useText();

  return (
    <a
      href={getTranslatorLink({ to, text })}
      className={cx(styles.link, className)}
      target="_blank"
      rel="noopener"
      {...props}
    >
      {children}
    </a>
  );
};

export default TranslatorLink;
