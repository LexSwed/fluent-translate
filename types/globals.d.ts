declare module '*.css' {
  const styles: Record<string, string>;

  export = styles;
}

type TranslateQuery = { to?: string; from?: string; text: string };

type TranslateResponse = {
  from: string | undefined;
  to: string;
  translation: {
    text: string;
    truncated: boolean;
  };
};
