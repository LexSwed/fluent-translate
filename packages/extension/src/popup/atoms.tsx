import React from 'react';
import { Provider, atom, useAtom } from 'jotai';
import { useUpdateAtom, useAtomValue } from 'jotai/utils';
import { Storage, userLang } from '../utils';

export const StoreProvider: React.FC = ({ children }) => {
  return <Provider>{children}</Provider>;
};

/**
 * User input text
 */
const inputTextAtom = atom('');
export const useInputText = () => useAtom(inputTextAtom);
export const useUpdateInputText = () => useUpdateAtom(inputTextAtom);

/**
 * List of available languages
 */
const languagesAtom = atom<Languages>({});
languagesAtom.onMount = (setLanguages) => {
  async function load() {
    const { languages } = await Storage.getItems<{
      languages?: Languages;
    }>(['to', 'languages']);
    if (languages) {
      setLanguages(languages);
    }
  }
  load();
};
export const useLanguages = () => useAtomValue(languagesAtom);

/**
 * Selected language translate the text FROM
 */
const fromLanguageAtom = atom<string>('auto');
export const useFromLanguage = () => useAtom(fromLanguageAtom);

/**
 * Selected language translate the text TO
 */
const toLanguageValueAtom = atom(userLang);
const toLanguageAtom = atom(
  (get) => get(toLanguageValueAtom),
  (_get, set, newTo: string) => {
    set(toLanguageValueAtom, newTo);
    Storage.setItems({ to: newTo });
  }
);
toLanguageAtom.onMount = (setTo) => {
  async function load() {
    const { to } = await Storage.getItems<{
      to?: 'string';
    }>(['to']);
    if (to) {
      setTo(to);
    }
  }
  load();
};
export const useToLanguage = () => useAtom(toLanguageAtom);

export const useSavedItem = () => {
  const setFrom = useUpdateAtom(fromLanguageAtom);
  const setTo = useUpdateAtom(toLanguageAtom);
  const setText = useUpdateAtom(inputTextAtom);

  return ({ to, from, text }: MemoryItem) => {
    setTo(to);
    setFrom(from);
    setText(text);
  };
};

const errorAtom = atom<string | null>(null);
export const useError = () => useAtom(errorAtom);
export const useUpdateError = () => useUpdateAtom(errorAtom);

const memoryAtom = atom<MemoryItems>([]);
export const useMemoryItems = () => {
  const items = useAtomValue(memoryAtom);

  const onDelete = React.useCallback(async (id: MemoryItem['id']) => {
    const { memory } = await Storage.getSyncItems<{ memory: MemoryItems }>(
      'memory'
    );

    const items = memory.filter((entry) => entry.id !== id);

    // atom value automatically updated due to listener set up on mount
    await Storage.setSyncItems({ memory: items });

    return items;
  }, []);

  return [items, onDelete] as const;
};
memoryAtom.onMount = (setMemoryItems) => {
  async function load() {
    const { memory = [] } = await Storage.getSyncItems<{ memory: MemoryItems }>(
      'memory'
    );
    setMemoryItems(memory);
  }
  load();
  const onChange: onStorageChangeListener = ({ memory }, name) => {
    if (memory?.newValue && name === 'sync') {
      setMemoryItems(memory?.newValue as MemoryItems);
    }
  };

  chrome.storage.onChanged.addListener(onChange);

  return () => {
    chrome.storage.onChanged.removeListener(onChange);
  };
};

type onStorageChangeListener = Parameters<
  typeof chrome.storage.onChanged.addListener
>[0];
