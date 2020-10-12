import React from 'react';
import { Icon, Menu, styled, Text } from '@fxtrot/ui';
import { HiDotsVertical } from 'react-icons/hi';

import TranslatorLink from '../TranslatorLink';

const Item = styled(Menu.Item, {
  height: '$7',
});

const More: React.FC = () => {
  return (
    <Menu>
      <Menu.Button variant="flat" aria-label="More" size="sm">
        <Icon as={HiDotsVertical} size="sm" />
      </Menu.Button>
      <Menu.List offset={0}>
        <Item
          onPress={() =>
            chrome.tabs.create({
              url: 'https://alexanderswed.typeform.com/to/sjSxc6',
            })
          }
        >
          <Text size="sm">Leave Feedback</Text>
        </Item>
        <Item as={TranslatorLink}>
          <Text size="sm">Open in Microsoft Bing</Text>
        </Item>
      </Menu.List>
    </Menu>
  );
};

export default More;
