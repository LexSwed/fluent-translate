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
  const [, dispatch] = useUpdateTranslation();
  const setError = useUpdateError();
  useEffect(() => {
    async function translate() {
      const trimmed = text.trim();

      setError(null);

      if (trimmed.length < 2) {
        dispatch({ type: 'reset' });
        return;
      }

      dispatch({ type: 'fetching' });

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

        dispatch({
          type: 'done',
          payload: res,
        });
      } catch (error) {
        setError(`${error}`);
        dispatch({ type: 'reset' });
      }
    }
    const id = setTimeout(translate, 500);
    return () => clearTimeout(id);
  }, [text, from, to, setError, dispatch]);

  return <>{children}</>;
};
