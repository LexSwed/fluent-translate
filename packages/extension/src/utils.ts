export const userLang =
  window.navigator.language.slice(0, 2) ||
  window.navigator.languages[0].slice(0, 2);

export const getTranslatorLink = ({
  to,
  text,
}: {
  to?: string;
  text?: string;
}) => `https://translate.google.com/?op=translate&tl=${to}&text=${text}`;

export const API = {
  getLanguages: () => {
    return new Promise((resolve) =>
      chrome.runtime.sendMessage({ request: 'getLanguages' }, resolve)
    );
  },
  translate: (params: TranslateQuery): Promise<TranslateResponse> => {
    return new Promise((resolve) =>
      chrome.runtime.sendMessage({ request: 'translate', params }, resolve)
    );
  },
};

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
      chrome.storage[storageType].set(item, () => resolve())
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
