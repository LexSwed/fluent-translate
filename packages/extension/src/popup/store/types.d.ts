type Language = { name: string; nativeName: string };
type Languages = Record<string, Language>;

type Translation = {
  translating: boolean;
  truncated: boolean;
  text: string;
  from: string;
  to: string;
};

type Action =
  | {
      type: 'translated';
      payload: { text: string; to?: string; from?: string; truncated: boolean };
    }
  | { type: 'translating' }
  | { type: 'textRemoved' };

type Store = {
  error: string | null;
  languages: Languages;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  from: string;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  to: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  translation: Translation;
};
