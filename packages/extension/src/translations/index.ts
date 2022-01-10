import { en } from './en';
import { userLang } from '../popup/utils';

const translations: Record<string, Record<keyof typeof en, string>> = {
  en,
};

const translator = (key: keyof typeof en) => translations[userLang]?.[key];

export const useLocale = () => translator;
