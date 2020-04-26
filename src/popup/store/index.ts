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
    getCachedItems().then(cache => {
      cache.to && setTo(cache.to);
      cache.languages && setLangs(langs => ({ ...langs, ...cache.languages }));
    });
  }, [setTo, setLangs]);

  //   useEffect(() => {
  //     if (from !== 'auto') {
  //       return;
  //     }

  //     const $from = translation.from;
  //     if ($from) {
  //       setLangs(langs => {
  //         const suffix = ' | Auto';
  //         const name = langs[$from].name + suffix;
  //         const nativeName = langs[$from].nativeName + suffix;

  //         return { ...langs, auto: { name, nativeName } };
  //       });
  //     }
  //   }, [from, translation.from]);

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
