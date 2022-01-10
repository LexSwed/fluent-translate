import { Icon, IconButton } from '@fxtrot/ui';
import { SwitchVerticalIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { useLocale } from '../../translations';
import {
  useSourceLanguage,
  useTargetLanguage,
  useUpdateInputText,
} from '../atoms';
import { useTranslation } from '../Translator';

export const SwitchTranslations = memo(() => {
  const [to, setTo] = useTargetLanguage();
  const [from, setFrom] = useSourceLanguage();
  const setText = useUpdateInputText();
  const translation = useTranslation();
  const t = useLocale();

  return (
    <IconButton
      label={t('popup.translation-switch')}
      size="sm"
      variant="flat"
      onClick={() => {
        setFrom(to);
        setTo(from === 'auto' ? translation.from : from);
        if (translation.translation?.text) {
          setText(translation.translation?.text);
        }
      }}
    >
      <Icon as={SwitchVerticalIcon} />
    </IconButton>
  );
});
