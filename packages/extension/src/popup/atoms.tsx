import React from 'react';
import { Provider, atom, useAtom } from 'jotai';
import {
  useUpdateAtom,
  useAtomValue,
  selectAtom,
  useReducerAtom,
} from 'jotai/utils';
import { Storage, userLang } from '../utils';
import { TranslateResponse } from '../../../common/types';

export const StoreProvider: React.FC = ({ children }) => {
  return <Provider>{children}</Provider>;
};

/**
 * User input text
 */
const inputTextAtom = atom('');
export const useInputText = () => useAtom(inputTextAtom);

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

/**
 * Translation result
 * We need to duplicate "from" here and in respective atom to keep the selection
 * to "auto" while providing a hint about the language used for translation
 */
type TranslateAtomValue =
  | TranslateResponse
  | {
      from: string;
      to: string;
      fetching: boolean;
      translation: null;
    };
const translationAtom = atom<TranslateAtomValue>({
  from: '',
  to: '',
  translation: null,
});
export const useTranslation = () => useAtomValue(translationAtom);
type TranslateReducerAction =
  | {
      type: 'fetching';
    }
  | {
      type: 'done';
      payload: TranslateResponse;
    }
  | {
      type: 'reset';
    };
const translationReducer = (
  { from, to }: TranslateAtomValue,
  action: TranslateReducerAction
) => {
  switch (action.type) {
    case 'fetching': {
      return {
        from,
        to,
        fetching: true,
        translation: null,
      };
    }
    case 'done': {
      const { payload } = action;
      return {
        from: payload.from,
        to: payload.to,
        translation: payload.translation,
      };
    }
    case 'reset':
    default: {
      return {
        from,
        to,
        translation: null,
      };
    }
  }
};
export const useUpdateTranslation = () =>
  useReducerAtom(translationAtom, translationReducer);
const translatingAtom = selectAtom(translationAtom, (state) =>
  'fetching' in state ? state.fetching : false
);
export const useTranslatingStatus = () => useAtomValue(translatingAtom);

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
