import React, { useState } from 'react';

import { Box, ThemeProvider } from '@fxtrot/ui';
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
  const mounted = useMounted();
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const body = (
    <ThemeProvider theme={prefersDark ? darkTheme : 'lightBlue'}>
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }

  return body;
};

function useMediaQuery(query: string): boolean {
  const mounted = useMounted();
  if (mounted) {
    return window.matchMedia(query).matches;
  }
  return false;
}

function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
