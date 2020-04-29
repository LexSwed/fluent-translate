import { useContext, createContext } from 'react';

const context = createContext<Store>({} as Store);

export const StoreContextProvider = context.Provider;

export const useLanguages = () => {
  return useContext(context).languages;
};

export const useText = () => {
  const { text, setText } = useContext(context);

  return [text, setText] as const;
};

export const useToLanguage = () => {
  const { to, setTo } = useContext(context);

  const updateTo = (langKey: string) => {
    chrome.storage.local.set({ to: langKey });
    setTo(langKey);
  };

  return [to, updateTo] as const;
};

export const useFromLanguage = () => {
  const { from, setFrom } = useContext(context);

  return [from, setFrom] as const;
};

export const useTranslation = () => {
  return useContext(context).translation;
};

export function getCachedItems(): Promise<{
  to?: 'string';
  languages?: Languages;
}> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['to', 'languages'], (cache) => {
      resolve(cache);
    });
  });
}
