import React from 'react';
import { Icon, Menu, IconButton, CssStyles } from '@fxtrot/ui';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useLocale } from '../../translations';

import { useTranslatorLink } from '../TranslatorLink';

export const More: React.FC = () => {
  const t = useLocale();
  const translatorHref = useTranslatorLink();
  return (
    <Menu>
      <IconButton variant="flat" label={t('popup.more.label')} size="sm">
        <Icon as={DotsVerticalIcon} size="md" />
      </IconButton>
      <Menu.List side="bottom" align="end">
        <Menu.Item
          size="sm"
          css={menuItem}
          onClick={() =>
            chrome.tabs.create({
              url: 'https://lexswed.typeform.com/to/fKJxgcPE',
            })
          }
        >
          {t('popup.more.feedback')}
        </Menu.Item>
        <Menu.Item
          size="sm"
          css={menuItem}
          onClick={() => {
            chrome.tabs.create({
              url: translatorHref,
            });
          }}
        >
          {t('popup.more.open-in-tab')}
        </Menu.Item>
      </Menu.List>
    </Menu>
  );
};

const menuItem: CssStyles = {
  textSize: '$sm',
};
