import { LanguageSelect } from './LanguageSelect';
import { useLocale } from '../../translations';
import { useLanguages, useTargetLanguage } from '../atoms';

export const TargetLanguageSelect = () => {
  const [to, setTo] = useTargetLanguage();
  const languages = useLanguages();
  const t = useLocale();
  return (
    <LanguageSelect
      value={to}
      onChange={setTo}
      languages={languages}
      label={t('popup.select.target-language')}
    />
  );
};
