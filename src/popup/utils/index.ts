import { useEffect, useState } from 'react';

const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    window.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);

    const handleThemeChange = (event: MediaQueryListEvent) => {
      const theme = event.matches ? 'dark' : 'light';

      setTheme(theme);
    };

    mediaQuery.addListener(handleThemeChange);

    return () => {
      mediaQuery.removeListener(handleThemeChange);
    };
  }, []);

  return theme;
}
