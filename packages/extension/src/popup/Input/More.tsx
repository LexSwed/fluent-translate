import { Icon, Menu, IconButton } from '@fxtrot/ui';
import { DotsVerticalIcon } from '@heroicons/react/outline';

import { useTranslatorLink } from '../TranslatorLink';

export const More: React.FC = () => {
  return (
    <Menu>
      <IconButton variant="flat" label="More" size="sm">
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
          Leave Feedback
        </Menu.Item>
        <OpenInGoogleMenuItem />
      </Menu.List>
    </Menu>
  );
};

const OpenInGoogleMenuItem = () => {
  const translatorHref = useTranslatorLink();
  return (
    <Menu.Item
      onClick={() => {
        chrome.tabs.create({
          url: translatorHref,
        });
      }}
      size="sm"
    >
      Open in Google Translate
    </Menu.Item>
  );
};
