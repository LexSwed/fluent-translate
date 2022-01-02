import React, { useEffect, useState } from 'react';
import { API } from '../utils';

import { ThemeProvider } from '@fxtrot/ui';
import {
  StoreProvider,
  useFromLanguage,
  useInputText,
  useToLanguage,
  useUpdateError,
  useUpdateTranslation,
} from './atoms';

type Theme = React.ComponentProps<typeof ThemeProvider>['theme'];

const darkTheme: Theme = {
  colors: {
    text: '#fff',
    textDisabled: '$gray200',
    textLight: '$gray300',
    textSubtle: '#gray400',
    accent: '#4fcae6',
    accentLight: '$gray50',
    focusRing: '$gray50',

    success: '$success',
    danger: '$danger',

    primaryStill: '#4fcae6',
    primaryHover: '#6adef8',
    primaryActive: '#1e99b4',
    primaryLight: '#5db6ca',
    primaryLightActive: '#81c0ce',

    surfaceStill: '#333333',
    surfaceHover: '#404040',
    surfaceActive: '#454545',
    surfaceDisabled: 'rgba(0,0,0,0.2)',

    flatStill: 'transparent',
    flatHover: 'rgba(255,255,255,0.15)',
    flatActive: 'rgba(255,255,255,0.3)',
    flatDisabled: 'rgba(0,0,0,0.2)',

    borderStill: '#737373',
    borderHover: '#9A9A9A',
    borderActive: '#888888',
    borderLight: '#404040',
  },
};

export const AppContext: React.FC = ({ children }) => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={prefersDark ? darkTheme : 'lightBlue'}>
      <StoreProvider>
        <Translator>{children}</Translator>
      </StoreProvider>
    </ThemeProvider>
  );
};

const Translator: React.FC = ({ children }) => {
  const [text] = useInputText();
  const [from] = useFromLanguage();
  const [to] = useToLanguage();
  const setTranslation = useUpdateTranslation();
  const setError = useUpdateError();

  useEffect(() => {
    async function translate() {
      const trimmed = text.trim();

      setError(null);
      setTranslation((prev) => ({ ...prev, translation: null }));

      if (trimmed.length < 2) {
        return;
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

        setTranslation({
          from: res.from,
          to: res.to,
          translation: res.translation,
        });
      } catch (error) {
        setError(`${error}`);
        setTranslation({ translation: null });
      }
    }
    const id = setTimeout(translate, 500);
    return () => clearTimeout(id);
  }, [text, from, to, setError, setTranslation]);

  return <>{children}</>;
};

function useMediaQuery(query: string) {
  const [matches] = useState(() => {
    return window.matchMedia(query).matches;
  });

  return matches;
}
