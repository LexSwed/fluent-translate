export type TranslateResponse = {
  from: string;
  to: string;
  translation: TranslationSuccess | null;
};

export type TranslationSuccess = {
  text: string;
  pronunciation?: string;
  alternatives?: string[];
  definitions?: TranslateDefinition[];
};

export type TranslateDefinition = {
  type: string;
  explanations: { explanation: string; example?: string }[];
};
