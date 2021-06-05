import { useState, useEffect } from 'react';

import { userLang, Storage, API } from '../../utils';
import useTranslation from './useTranslation';

export function useStore() {
  const [languages, setLangs] = useState<Languages>({});
  const [text, setText] = useState<string>('');
  const [from, setFrom] = useState<string>('auto');
  const [to, setTo] = useState<string>(userLang);
  const translation = useTranslation({ to, from, text });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fillStorage() {
      const { to, languages } = await Storage.getItems<{
        to?: 'string';
        languages?: Languages;
      }>(['to', 'languages']);
      to && setTo(to);
      languages && setLangs((langs) => ({ ...langs, ...languages }));
    }

    fillStorage();
  }, [setTo, setLangs]);

  useEffect(() => {
    API.setErrorHandler(setError);
  }, []);

  const store: Store = {
    error,
    languages,
    text,
    from,
    to,
    translation,
    setText,
    setFrom,
    setTo,
  };

  return store;
}
