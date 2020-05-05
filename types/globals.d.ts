declare module '*.css' {
  const styles: Record<string, string>;

  export = styles;
}
declare module 'react-shadow';

type TranslateQuery = { to?: string; from?: string; text: string };

type TranslateResponse = {
  from: string | undefined;
  to: string;
  translation: {
    text: string;
    truncated: boolean;
  };
};

type AsyncRequest =
  | { request: 'getLanguages'; params: undefined }
  | { request: 'translate'; params: TranslateQuery };

type HistoryItem = {
  from: string;
  to: string;
  text: string;
  translation: string;
};

type HistoryItems = HistoryItem[];
