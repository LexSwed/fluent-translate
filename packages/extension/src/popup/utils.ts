import { useEffect, useRef, useState } from 'react';
import {
  BrowserClient,
  Breadcrumbs,
  Dedupe,
  defaultStackParser,
  getCurrentHub,
  GlobalHandlers,
  makeFetchTransport,
  LinkedErrors,
} from '@sentry/browser';
import type { TranslateResponse } from '@fluent-translate/shared';
import { translate } from '../background/api';
import { addMemoryItem } from '../background/utils';
import { languages } from '../background/languages';
import { isBrowserEnv } from '../isBrowserEnv';

export const browser = {
  get lang() {
    if (isServer) {
      return 'en';
    }
    return (
      window.navigator.language.slice(0, 2) ||
      window.navigator.languages[0].slice(0, 2)
    );
  },
};

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

class BrowserFetcher {
  translate = async ({ from, to, text }: TranslateQuery) => {
    const trimmed = text.trim();
    if (trimmed.length < 2) {
      return null;
    }
    const res = await translate({ from, to, text: trimmed });
    if (res !== null && res.translation?.text) {
      addMemoryItem({
        text: trimmed,
        from: res.from || from || 'auto',
        to: res.to || to,
        translation: res.translation.text,
      });
    }
    return res;
  };
}

const makeRequest = <T = any>(request: AsyncRequest): Promise<T> =>
  new Promise((resolve, reject) =>
    chrome.runtime.sendMessage(request, (res) =>
      res?.ok ? resolve(res.data) : reject(res.message)
    )
  );

class ChromeStorage implements IStorage {
  getItems = <T extends Record<string, any>>(
    key: StorageKey,
    storageType: 'local' | 'sync' = 'local'
  ): Promise<T> => {
    return new Promise((resolve) => {
      chrome.storage[storageType].get(key, (caches) => resolve(caches as T));
    });
  };

  setItems = (item: object, storageType: 'local' | 'sync' = 'local') => {
    return new Promise<undefined>((resolve) =>
      chrome.storage[storageType].set(item, () => resolve(undefined))
    );
  };
  getSyncItems = <T>(key: StorageKey) => Storage.getItems<T>(key, 'sync');

  setSyncItems = (item: object) => Storage.setItems(item, 'sync');

  listen = (onChange: onStorageChangeListener) => {
    chrome.storage.onChanged.addListener(onChange);
    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    };
  };
}

class BrowserStorage implements IStorage {
  getItems = async <T extends Record<string, any>>(
    key: StorageKey
  ): Promise<T> => {
    let items: Record<string, any> = {};
    if (typeof key === 'string') {
      items[key] = sessionStorage.getItem(key);
    } else if (Array.isArray(key)) {
      key.forEach((itemKey) => {
        items[itemKey] = sessionStorage.getItem(itemKey);
      }, {});
    }
    Object.entries(items).forEach(([key, value]) => {
      if (key === 'languages' && !value) {
        items[key] = languages;
      } else if (value) {
        try {
          items[key] = JSON.parse(value);
        } catch (error) {}
      } else {
        // chrome storage returns undefined, sessionStorage returns null
        items[key] = undefined;
      }
    });

    return items as T;
  };

  setItems = async (item: object) => {
    Object.entries(item).forEach(([key, value]) => {
      if (value) {
        try {
          sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {}
      }
    });
  };

  getSyncItems = <T>(key: StorageKey) => Storage.getItems<T>(key, 'sync');
  setSyncItems = (item: object) => Storage.setItems(item, 'sync');
  listen = (onChange: onStorageChangeListener) => {
    const id = setInterval(() => {
      const res: Record<string, chrome.storage.StorageChange> = {};
      Object.entries(sessionStorage).forEach(([key, value]) => {
        try {
          res[key] = {
            newValue: JSON.parse(value),
          };
        } catch (error) {}
      });
      onChange(res, 'sync');
    }, 1000);
    return () => {
      clearInterval(id);
    };
  };
}

export const API = isBrowserEnv
  ? new BrowserFetcher()
  : new BackgroundFetcher();

export const Storage = isBrowserEnv
  ? new BrowserStorage()
  : new ChromeStorage();

type onStorageChangeListener = Parameters<
  typeof chrome.storage.onChanged.addListener
>[0];

type StorageKey = Parameters<typeof chrome.storage['local']['get']>[0];
export const Sentry = new BrowserClient({
  dsn: 'https://dffd96a87e8f47e8a2921033d3d53e05@o383828.ingest.sentry.io/5214268',
  transport: makeFetchTransport,
  stackParser: defaultStackParser,
  // Only the integrations listed here will be used
  integrations: [
    new Breadcrumbs(),
    new GlobalHandlers(),
    new LinkedErrors(),
    new Dedupe(),
  ],
  debug: process.env.NODE_ENV === 'development',
  environment: process.env.NODE_ENV,
});
getCurrentHub().bindClient(Sentry);

interface IStorage {
  getItems<T extends Record<string, any>>(
    key: StorageKey,
    storageType: 'local' | 'sync'
  ): Promise<T>;

  setItems(item: object, storageType: 'local' | 'sync'): Promise<void>;

  getSyncItems<T>(key: StorageKey): Promise<T>;

  setSyncItems(item: object): Promise<void>;

  listen(onChange: onStorageChangeListener): () => void;
}

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
  const timeoutRef = useRef<NodeJS.Timeout>();
  const cooldownRef = useRef(false);

  const cancel = () => timeoutRef.current && clearTimeout(timeoutRef.current);

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

const isServer = typeof window === 'undefined';
