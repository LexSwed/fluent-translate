import { Icon, Menu, IconButton } from '@fxtrot/ui';
import { DotsVerticalIcon } from '@heroicons/react/outline';

import { useTranslatorLink } from '../TranslatorLink';

const More: React.FC = () => {
  const translatorHref = useTranslatorLink();
  return (
    <Menu>
      <IconButton variant="flat" aria-label="More" size="sm">
        <Icon as={DotsVerticalIcon} size="md" />
      </IconButton>
      <Menu.List side="top">
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
      </Menu.List>
    </Menu>
  );
};

export default More;
