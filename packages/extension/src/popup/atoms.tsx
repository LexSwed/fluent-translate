import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValueLoadable,
  useRecoilStateLoadable,
} from 'recoil';
import { API, Storage, userLang } from '../utils';

export const StoreProvider: React.FC = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

/**
 * User input text
 */
const inputTextAtom = atom({
  key: 'inputText',
  default: '',
});
export const useInputText = () => useRecoilState(inputTextAtom);

/**
 * List of available languages
 */
const languagesAtom = selector({
  key: 'languagesList',
  get: async () => {
    const { languages } = await Storage.getItems<{
      languages?: Languages;
    }>(['to', 'languages']);
    return languages as Languages;
  },
});
export const useLanguages = () => {
  const loadable = useRecoilValueLoadable(languagesAtom);
  switch (loadable.state) {
    case 'hasValue':
      return loadable.contents;
    default:
      return {};
  }
};

/**
 * Selected language translate the text FROM
 */
const fromLanguageAtom = atom<string>({
  key: 'fromLanguage',
  default: 'auto',
});
export const useFromLanguage = () => useRecoilState(fromLanguageAtom);

/**
 * Selected language translate the text TO
 */
const toLanguageAtom = atom({
  key: 'toLanguage',
  default: selector({
    key: 'toLanguage/default',
    get: async () => {
      const { to } = await Storage.getItems<{
        to?: 'string';
      }>(['to']);
      return to as string;
    },
    set: async ({ set }, value) => {
      // set(toLanguageAtom, value)
      await Storage.setItems({ to: value });
    },
  }),
});
export const useToLanguage = () => {
  const [loadable, setState] = useRecoilStateLoadable(toLanguageAtom);
  switch (loadable.state) {
    case 'hasValue':
      return [loadable.contents, setState] as const;
    default:
      return ['', setState] as const;
  }
};

/**
 * Translation result
 * We need to duplicate "from" here and in respective atom to keep the selection
 * to "auto" while providing a hint about the language used for translation
 */
const translationAtom = atom<TranslateResponse>({
  key: 'translation',
  default: selector({
    key: 'translation/default',
    get: async ({ get }) => {
      const to = get(toLanguageAtom);
      const from = get(fromLanguageAtom);
      const text = get(inputTextAtom);
      const trimmed = text.trim();

      if (trimmed.length < 2) {
        return {
          translation: null,
        };
      }

      try {
        const res = await API.translate({
          // let it guess the language if Auto is selected
          from: from === 'auto' ? undefined : from,
          to,
          text: trimmed,
        });

        if (!res) {
          throw new Error('Failed to fetch');
        }

        return {
          from: res.from,
          to: res.to,
          translation: res.translation,
        };
      } catch (error) {
        return {
          translation: null,
        };
      }
    },
  }),
});
export const useTranslation = () => {
  const loadable = useRecoilValueLoadable(translationAtom);
  switch (loadable.state) {
    case 'hasValue':
      return loadable.contents;
    default:
      return {
        translation: null,
      };
  }
};

const errorAtom = atom<string | null>({
  key: 'error',
  default: null,
});

export const useError = () => useRecoilState(errorAtom);
