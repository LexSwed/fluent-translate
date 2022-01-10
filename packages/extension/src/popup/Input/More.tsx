import { Icon, Menu, IconButton } from '@fxtrot/ui';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useLocale } from '../../translations';

import { useTranslatorLink } from '../TranslatorLink';

export const More: React.FC = () => {
  const t = useLocale();
  return (
    <Menu>
      <IconButton variant="flat" label={t('popup.more.label')} size="sm">
        <Icon as={DotsVerticalIcon} size="md" />
      </IconButton>
      <Menu.List side="bottom">
        <Menu.Item
          size="sm"
          onClick={() =>
            chrome.tabs.create({
              url: 'https://lexswed.typeform.com/to/fKJxgcPE',
            })
          }
        >
          {t('popup.more.feedback')}
        </Menu.Item>
        <OpenInGoogleMenuItem />
      </Menu.List>
    </Menu>
  );
};

const OpenInGoogleMenuItem = () => {
  const translatorHref = useTranslatorLink();
  const t = useLocale();
  return (
    <Menu.Item
      onClick={() => {
        chrome.tabs.create({
          url: translatorHref,
        });
      }}
      size="sm"
    >
      {t('popup.more.open-in-tab')}
    </Menu.Item>
  );
};
