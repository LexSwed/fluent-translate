import React, { useState } from 'react';

import { ThemeProvider } from '@fxtrot/ui';
import { StoreProvider } from './atoms';

type Theme = React.ComponentProps<typeof ThemeProvider>['theme'];

const darkTheme: Theme = {
  colors: {
    text: '#fff',
    textDisabled: '$gray200',
    textLight: '$gray200',
    textSubtle: '$gray300',
    accent: '#fff',
    accentLight: '$gray50',
    focusRing: '$gray50',

    success: '$success',
    danger: '$danger',

    primaryStill: 'hsl(191, 75%, 60%)',
    primaryHover: 'hsl(191, 75%, 70%)',
    primaryActive: 'hsl(191, 75%, 50%)',
    primaryLight: 'hsl(191, 75%, 20%)',
    primaryLightActive: 'hsl(191, 75%, 70%)',

    surfaceStill: 'hsl(0, 0%, 20%)',
    surfaceHover: 'hsl(0, 0%, 25%)',
    surfaceActive: 'hsl(0, 0%, 28%)',
    surfaceDisabled: 'hsla(0, 0%, 20%, 0.2)',
    surfaceLayer: 'hsl(0, 0%, 25%)',

    flatStill: 'transparent',
    flatHover: 'hsla(0, 0%, 100%, 0.15)',
    flatActive: 'hsla(0, 0%, 100%, 0.25)',
    flatDisabled: 'hsla(0, 0%, 0%, 0.2)',

    borderStill: 'hsl(0, 0%, 45%)',
    borderHover: 'hsl(0, 0%, 50%)',
    borderActive: 'hsl(0, 0%, 60%)',
    borderLight: 'hsl(0, 0%, 35%)',
  },
};

export const AppContext: React.FC = ({ children }) => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={prefersDark ? darkTheme : 'lightBlue'}>
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );
};

function useMediaQuery(query: string) {
  const [matches] = useState(() => {
    return window.matchMedia(query).matches;
  });

  return matches;
}
