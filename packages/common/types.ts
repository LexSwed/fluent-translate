export type TranslateResponse = {
  from: string;
  to: string;
  translation: {
    text: string;
    pronunciation?: string;
    alternatives?: string[];
  } | null;
};
