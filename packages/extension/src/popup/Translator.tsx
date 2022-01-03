import React, { useEffect } from 'react';
import { API } from '../utils';

import {
  useFromLanguage,
  useInputText,
  useToLanguage,
  useUpdateError,
  useUpdateTranslation,
} from './atoms';

export const Translator: React.FC = ({ children }) => {
  const [text] = useInputText();
  const [from] = useFromLanguage();
  const [to] = useToLanguage();
  const setTranslation = useUpdateTranslation();
  const setError = useUpdateError();

  useEffect(() => {
    async function translate() {
      const trimmed = text.trim();

      setError(null);

      if (trimmed.length < 2) {
        setTranslation(({ from, to }) => ({ from, to, translation: null }));
        return;
      }

      setTranslation(({ from, to }) => ({
        from,
        to,
        translation: null,
        fetching: true,
      }));

      try {
        const res = await API.translate({
          // let it guess the language if Auto is selected
          from: from === 'auto' ? undefined : from,
          to,
          text: trimmed,
        });

        if (!res) {
          throw new Error('Failed to fetch');
        }

        setTranslation({
          from: res.from,
          to: res.to,
          translation: res.translation,
        });
      } catch (error) {
        setError(`${error}`);
        setTranslation({ translation: null });
      }
    }
    const id = setTimeout(translate, 500);
    return () => clearTimeout(id);
  }, [text, from, to, setError, setTranslation]);

  return <>{children}</>;
};
