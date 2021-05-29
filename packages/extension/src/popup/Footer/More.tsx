import React from 'react';
import { Icon, Button, Menu, Item as MenuItem, styled, Text } from '@fxtrot/ui';
import { DotsVerticalIcon } from '@heroicons/react/outline';

import { useTranslatorLink } from '../TranslatorLink';

const Item = styled(MenuItem, {
  height: '$8',
  fontSize: '$sm',
});

const More: React.FC = () => {
  const translatorHref = useTranslatorLink();
  return (
    <Menu>
      <Button variant="flat" aria-label="More" size="xs">
        <Icon as={DotsVerticalIcon} size="md" />
      </Button>
      <Menu.List>
        <Item
          onClick={() =>
            chrome.tabs.create({
              url: 'https://lexswed.typeform.com/to/fKJxgcPE',
            })
          }
        >
          <Text size="sm">Leave Feedback</Text>
        </Item>
        <Item
          onClick={() => {
            chrome.tabs.create({
              url: translatorHref,
            });
          }}
        >
          <Text size="sm">Open in Microsoft Bing</Text>
        </Item>
      </Menu.List>
    </Menu>
  );
};

export default More;
