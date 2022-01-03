import React, { useState } from 'react';

import { ThemeProvider } from '@fxtrot/ui';
import { StoreProvider } from './atoms';
import { Translator } from './Translator';

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

    surfaceStill: 'hsl(0, 0%, 20%)',
    surfaceHover: 'hsl(0, 0%, 25%)',
    surfaceActive: 'hsl(0, 0%, 28%)',
    surfaceDisabled: 'hsla(0, 0%, 20%, 0.2)',

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
      <StoreProvider>
        <Translator>{children}</Translator>
      </StoreProvider>
    </ThemeProvider>
  );
};

function useMediaQuery(query: string) {
  const [matches] = useState(() => {
    return window.matchMedia(query).matches;
  });

  return matches;
}
