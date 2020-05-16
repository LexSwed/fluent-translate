import React from 'react';
import { MenuButton, Button, Icon, ListBox, Option, Text } from '@fxtrot/edge';

const More: React.FC = () => {
  return (
    <MenuButton placement="top-start">
      <Button tone="transparent" size="xs" aria-label="More">
        <Icon icon="more_vert" />
      </Button>
      <ListBox>
        <Option
          onClick={() =>
            chrome.tabs.create({
              url: 'https://alexanderswed.typeform.com/to/sjSxc6',
            })
          }
        >
          <Text>Leave Feedback</Text>
        </Option>
      </ListBox>
    </MenuButton>
  );
};

export default More;
