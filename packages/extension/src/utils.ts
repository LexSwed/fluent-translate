import { BrowserClient } from '@sentry/browser';

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

const makeRequest = <T = any>(request: AsyncRequest): Promise<T> =>
  new Promise((resolve, reject) =>
    chrome.runtime.sendMessage(request, (res) =>
      res?.ok ? resolve(res.data) : reject(res.message)
    )
  );

class BackgroundFetcher {
  translateDebounceId: NodeJS.Timeout | null = null;

  translate = (params: TranslateQuery) => {
    if (this.translateDebounceId) {
      clearTimeout(this.translateDebounceId);
    }
    return new Promise<TranslateResponse>((resolve, reject) => {
      this.translateDebounceId = setTimeout(() => {
        makeRequest({ request: 'translate', params })
          .then(resolve)
          .catch(reject);
      }, 500);
    });
  };
}

export const API = new BackgroundFetcher();

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

export async function deleteMemoryEntry(id: MemoryItem['id']) {
  const { memory } = await Storage.getSyncItems<{ memory: MemoryItems }>(
    'memory'
  );

  const items = memory.filter((entry) => entry.id !== id);

  await Storage.setSyncItems({ memory: items });

  return items;
}

type StorageKey = Parameters<typeof chrome.storage['local']['get']>[0];

export const Sentry = new BrowserClient({
  dsn: 'https://dffd96a87e8f47e8a2921033d3d53e05@o383828.ingest.sentry.io/5214268',
});
