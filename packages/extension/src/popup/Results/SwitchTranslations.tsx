import { Icon, IconButton } from '@fxtrot/ui';
import { SwitchVerticalIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { useFromLanguage, useToLanguage, useUpdateInputText } from '../atoms';
import { useTranslation } from '../Translator';

export const SwitchTranslations = memo(() => {
  const [to, setTo] = useToLanguage();
  const [from, setFrom] = useFromLanguage();
  const setText = useUpdateInputText();
  const translation = useTranslation();

  return (
    <IconButton
      label="Switch languages"
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
