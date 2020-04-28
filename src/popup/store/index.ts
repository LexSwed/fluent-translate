import { useState, useEffect } from 'react';

import { userLang } from '../../utils';
import { getCachedItems } from './utils';
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
    getCachedItems().then((cache) => {
      cache.to && setTo(cache.to);
      cache.languages &&
        setLangs((langs) => ({ ...langs, ...cache.languages }));
    });
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
