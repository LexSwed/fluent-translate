declare module '*.css' {
  const styles: Record<string, string>;

  export = styles;
}
declare module 'react-shadow';

type TranslateQuery = { from?: string; to: string; text: string };

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
  | { request: 'translateGoogle'; params: TranslateQuery };

type MemoryItem = {
  id: string;
  from: string;
  to: string;
  text: string;
  translation: string;
};

type MemoryItems = MemoryItem[];
