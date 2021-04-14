import React, { useState } from 'react';

import { useStore } from './store';
import { StoreContextProvider } from './store/utils';
import { ThemeProvider } from '@fxtrot/ui';

type Theme = React.ComponentProps<typeof ThemeProvider>['theme'];

const darkTheme: Theme = {
  colors: {
    text: '#fff',
    textDisabled: '$gray200',
    textLight: '#9D9D9D',
    textSubtle: '#9D9D9D',
    accent: '#359ab0',
    accentLight: '$gray50',
    focusRing: '$gray50',

    success: '$success',
    danger: '$danger',

    primaryStill: '#359ab0',
    primaryHover: '#1c8ea6',
    primaryActive: '#03819c',
    primaryLight: '#4fa7ba',
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

const AppContextProvider: React.FC = ({ children }) => {
  const store = useStore();
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={prefersDark ? darkTheme : 'cyan'}>
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
