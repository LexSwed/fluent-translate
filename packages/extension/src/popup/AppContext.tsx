import React from 'react';

import { ThemeProvider } from '@fxtrot/ui';
import { StoreProvider } from './atoms';

type Theme = React.ComponentProps<typeof ThemeProvider>['theme'];

const theme: Theme = {
  colors: {
    primary: 'hsl(191 75% 60%)',
    onPrimary: 'hsl(223 100% 26.1%)',
    primaryContainer: 'hsl(221 100% 35.5%)',
    onPrimaryContainer: 'hsl(0 0% 0%)',
    secondary: 'hsl(203 100% 74.9%)',
    onSecondary: 'hsl(165 100% 11%)',
    secondaryContainer: 'hsl(167 100% 15.9%)',
    onSecondaryContainer: 'hsl(162 89.9% 72.9%)',
    tertiary: 'hsl(191 100% 58.6%)',
    onTertiary: 'hsl(192 100% 12.9%)',
    tertiaryContainer: 'hsl(191 100% 18.8%)',
    onTertiaryContainer: 'hsl(195 100% 84.7%)',
    success: 'hsl(163 63.5% 61.4%)',
    onSuccess: 'hsl(165 100% 11%)',
    successContainer: 'hsl(167 100% 15.9%)',
    onSuccessContainer: 'hsl(162 89.9% 72.9%)',
    error: 'hsl(348 100% 84.9%)',
    onError: 'hsl(338 100% 20%)',
    errorContainer: 'hsl(337 100% 28.2%)',
    onErrorContainer: 'hsl(351 100% 92.5%)',
    outline: 'hsl(264deg 5% 58%)',
    background: 'hsl(0 0% 20%)',
    onBackground: 'hsl(210 7.1% 89%)',
    surface: 'hsl(204 10% 25%)',
    onSurface: 'hsl(210 7.1% 89%)',
    surfaceVariant: 'hsl(264 7% 56%)',
    onSurfaceVariant: 'hsl(270 11.3% 79.2%)',
    inverseSurface: 'hsl(210 7.1% 89%)',
    inverseOnSurface: 'hsl(0 0% 20%)',
    disabled: 'hsl(0 0% 89% / 8%)',
    onDisabled: 'hsl(210 5% 75%)',
  },
};

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mounted = useMounted();
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const body = (
    <ThemeProvider theme={prefersDark ? theme : undefined}>
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
