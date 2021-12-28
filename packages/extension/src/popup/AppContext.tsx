import React, { useState } from 'react';

import { ThemeProvider } from '@fxtrot/ui';
import { StoreProvider } from './atoms';

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

const AppContextProvider: React.FC = ({ children }) => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={prefersDark ? darkTheme : 'lightBlue'}>
      <StoreProvider>{children}</StoreProvider>
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
