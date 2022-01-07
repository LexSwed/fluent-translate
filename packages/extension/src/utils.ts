import { useEffect, useRef, useState } from 'react';
import { BrowserClient } from '@sentry/browser';
import { TranslateResponse } from '../../common/types';

export const userLang =
  window.navigator.language.slice(0, 2) ||
  window.navigator.languages[0].slice(0, 2);

export const getTranslatorLink = ({
  from = 'auto',
  to,
  text,
}: {
  from?: string;
  to?: string;
  text?: string;
}) =>
  `https://translate.google.com/?sl=${from}&tl=${to}&text=${text}&op=translate`;

class BackgroundFetcher {
  translate = ({ from, to, text }: TranslateQuery) => {
    const trimmed = text.trim();
    if (trimmed.length < 2) {
      return null;
    }
    return makeRequest<TranslateResponse>({
      request: 'translate',
      params: {
        from: from === 'auto' ? undefined : from,
        to,
        text: trimmed,
      },
    });
  };
}

export const API = new BackgroundFetcher();

const makeRequest = <T = any>(request: AsyncRequest): Promise<T> =>
  new Promise((resolve, reject) =>
    chrome.runtime.sendMessage(request, (res) =>
      res?.ok ? resolve(res.data) : reject(res.message)
    )
  );

export const Storage = {
  getItems: <T extends Record<string, any>>(
    key: StorageKey,
    storageType: 'local' | 'sync' = 'local'
  ): Promise<T> => {
    return new Promise((resolve) => {
      chrome.storage[storageType].get(key, (caches) => resolve(caches as T));
    });
  },
  setItems: (item: object, storageType: 'local' | 'sync' = 'local') => {
    return new Promise((resolve) =>
      chrome.storage[storageType].set(item, () => resolve(undefined))
    );
  },
  getSyncItems: <T>(key: StorageKey) => Storage.getItems<T>(key, 'sync'),
  setSyncItems: (item: object) => Storage.setItems(item, 'sync'),
};

type StorageKey = Parameters<typeof chrome.storage['local']['get']>[0];

export const Sentry = new BrowserClient({
  dsn: 'https://dffd96a87e8f47e8a2921033d3d53e05@o383828.ingest.sentry.io/5214268',
});

/**
 * API: https://mantine.dev/hooks/use-debounced-value/
 * Source: https://github.com/mantinedev/mantine/blob/master/src/mantine-hooks/src/use-debounced-value/use-debounced-value.ts
 */
export function useDebouncedValue<T>(
  value: T,
  wait: number,
  options = { leading: true }
) {
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const cooldownRef = useRef(false);

  const cancel = () => clearTimeout(timeoutRef.current);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setValue(value);
      } else {
        cancel();
        timeoutRef.current = setTimeout(() => {
          cooldownRef.current = false;
          setValue(value);
        }, wait);
      }
    }
  }, [value, wait, options.leading]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return _value;
}
