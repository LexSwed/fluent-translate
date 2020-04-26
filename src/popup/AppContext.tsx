import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useContext
} from 'react';

import { userLang, translate } from '../utils';

const initialLanguages = {
  auto: {
    name: 'Auto',
    nativeName: 'Auto'
  }
};

const initialState: Translation = {
  translating: false,
  truncated: false,
  text: ''
};

type Context = {
  languages: Languages;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  from: string;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  to: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  translation: Translation;
};

const context = createContext<Context>({} as Context);

const AppContextProvider: React.FC = ({ children }) => {
  const [languages, setLangs] = useState<Languages>(initialLanguages);
  const [text, setText] = useState<string>('');
  const [from, setFrom] = useState<string>('auto');
  const [to, setTo] = useState<string>(userLang);
  const [translation, dispatch] = useReducer(translationReducer, initialState);

  useEffect(() => {
    chrome.storage.local.get(['to'], cache => {
      if (cache.to) {
        setTo(cache.to);
      }
    });

    chrome.storage.local.get(['languages'], cache => {
      setLangs({ ...languages, ...cache.languages });
    });
  }, [setTo, setLangs]);

  useEffect(() => {
    const id = setTimeout(async () => {
      if (text.length < 2) {
        dispatch({ type: 'textRemoved' });
        return;
      }

      dispatch({ type: 'translating' });

      const res = await translate({
        // let guess language if Auto is selected
        from: from === 'auto' ? undefined : from,
        // user lang
        to,
        text: text.trim()
      });

      dispatch({ type: 'translated', payload: res.translation });

      const $from = res.from;
      if ($from) {
        setLangs(langs => {
          const suffix = ' | Auto';
          const name = langs[$from].name + suffix;
          const nativeName = langs[$from].nativeName + suffix;

          return { ...langs, auto: { name, nativeName } };
        });
      }
      setTo(res.to);
    }, 300);

    return () => clearTimeout(id);
  }, [text, from, to, setLangs, dispatch]);

  return (
    <context.Provider
      value={{
        languages,
        text,
        setText,
        from,
        to,
        translation,
        setFrom,
        setTo
      }}
    >
      {children}
    </context.Provider>
  );
};

export default AppContextProvider;

export const useLanguages = () => {
  return useContext(context).languages;
};

export const useText = () => {
  const { text, setText } = useContext(context);

  return [text, setText] as const;
};

export const useToLanguage = () => {
  const { to, setTo } = useContext(context);

  return [to, setTo] as const;
};

export const useFromLanguage = () => {
  const { from, setFrom } = useContext(context);

  return [from, setFrom] as const;
};

export const useTranslation = () => {
  return useContext(context).translation;
};

function translationReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'translating':
      return { ...state, translating: true };
    case 'translated':
      return { ...state, translating: false, ...action.payload };
    case 'textRemoved':
      return {
        ...state,
        text: ''
      };
    default:
      return state;
  }
}

type Language = { name: string; nativeName: string };
type Languages = Record<string, Language>;

type Translation = {
  translating: boolean;
  truncated: boolean;
  text: string;
};

type Action =
  | { type: 'translated'; payload: Partial<Translation> }
  | { type: 'translating' }
  | { type: 'textRemoved' };
