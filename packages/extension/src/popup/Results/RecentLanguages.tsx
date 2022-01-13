import { Button, Flex } from '@fxtrot/ui';
import { useLanguages, useTargetLanguage } from '../atoms';
import { useRecentLanguages } from '../LanguageSelect/useRecentLanguages';

export const RecentLanguages = () => {
  const [recents] = useRecentLanguages();
  const languages = useLanguages();
  const [to, setTo] = useTargetLanguage();
  return (
    <Flex flow="row" gap="2">
      {recents
        .filter((lang) => lang !== to)
        .map((lang) => (
          <Button
            variant="outline"
            size="xs"
            onClick={() => setTo(lang)}
            key={lang}
          >
            {languages[lang]}
          </Button>
        ))}
    </Flex>
  );
};
