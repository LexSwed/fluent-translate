import { ca } from './ca';
import { de } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';
import { ja } from './ja';
import { ko } from './ko';
import { nl } from './nl';
import { pt } from './pt';
import { ru } from './ru';
import { zh } from './zh';

import { browser } from '../popup/utils';

const translations: Record<string, Record<keyof typeof en, string>> = {
  ca,
  de,
  en,
  es,
  fr,
  it,
  ja,
  ko,
  nl,
  pt,
  ru,
  zh,
};

const translator = (key: keyof typeof en) => translations[browser.lang]?.[key];

export const useLocale = () => translator;
