import { useState, useEffect } from 'react';

import { userLang, Storage } from '../../utils';
import useTranslation from './useTranslation';

const initialLanguages = {
  auto: {
    name: 'Auto',
    nativeName: 'Auto'
  }
};

export function useStore() {
  const [languages, setLangs] = useState<Languages>(initialLanguages);
  const [text, setText] = useState<string>('');
  const [from, setFrom] = useState<string>('auto');
  const [to, setTo] = useState<string>(userLang);
  const translation = useTranslation({ to, from, text });

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

  const store: Store = {
    languages,
    text,
    setText,
    from,
    to,
    translation,
    setFrom,
    setTo
  };

  return store;
}
