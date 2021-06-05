declare module '*.css' {
  const styles: Record<string, string>;

  export = styles;
}

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
  | { request: 'translate'; params: TranslateQuery }
  | { request: 'dictionaryLookup'; params: Required<TranslateQuery> };

type MemoryItem = {
  id: string;
  from: string;
  to: string;
  text: string;
  translation: string;
};

type MemoryItems = MemoryItem[];

type DictLookupResponse = {
  normalizedSource: string;
  displaySource: string;
  translations: {
    normalizedTarget: string;
    displayTarget: string;
    posTag: PartOfSpeech;
    confidence: number;
    prefixWord: string;
    backTranslations: {
      normalizedText: string;
      displayText: string;
      numExamples: number;
      frequencyCount: number;
    }[];
  }[];
}[];

type PartOfSpeech = string;

type DictLookup = {
  word: string;
  phonetics: { audio: string; text: string }[];
  meanings: {
    definitions: { definition: string; synonyms: string[] }[];
    partOfSpeech: string;
  }[];
};
