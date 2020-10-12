import React, { useState } from 'react';

import { useStore } from './store';
import { StoreContextProvider } from './store/utils';
import { ThemeProvider } from '@fxtrot/ui';

type Theme = React.ComponentProps<typeof ThemeProvider>['theme'];

const theme: Theme = {
  colors: {
    $text: 'var(--colors-gray900)',
    $textDisabled: 'var(--colors-gray500)',
    $textLight: 'var(--colors-gray400)',
    $accent: '#03748c',

    $primaryStill: '#03819c',
    $primaryHover: '#03748c',
    $primaryActive: '#02677d',
    $primaryLight: '#4fa7ba',
    $primaryLightActive: '#81c0ce',

    $surfaceStill: '#fff',
    $surfaceHover: 'var(--colors-gray100)',
    $surfaceActive: 'var(--colors-gray200)',
    $surfaceDisabled: 'var(--colors-gray200)',

    $borderStill: 'var(--colors-gray400)',
    $borderHover: 'var(--colors-gray500)',
    $borderActive: 'var(--colors-gray600)',
  },
};

const darkTheme: Theme = {
  colors: {
    $text: '#fff',
    $textDisabled: 'var(--colors-gray400)',
    $textLight: '#9D9D9D',
    $accent: '#fff',

    $primaryStill: '#359ab0',
    $primaryHover: '#1c8ea6',
    $primaryActive: '#03819c',
    $primaryLight: '#4fa7ba',
    $primaryLightActive: '#81c0ce',

    $surfaceStill: '#333333',
    $surfaceHover: '#404040',
    $surfaceActive: '#454545',
    $surfaceDisabled: 'rgba(0,0,0,0.2)',

    $borderStill: '#737373',
    $borderHover: '#9A9A9A',
    $borderActive: '#888888',
  },
};

const AppContextProvider: React.FC = ({ children }) => {
  const store = useStore();
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={prefersDark ? darkTheme : theme}>
      <StoreContextProvider value={store}>{children}</StoreContextProvider>
    </ThemeProvider>
  );
};

export default AppContextProvider;

function useMediaQuery(query: string) {
  const [matches] = useState(() => {
    return window.matchMedia(query).matches;
  });

  return matches;
}
