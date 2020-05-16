import React from 'react';
import { MenuButton, Button, Icon, ListBox, Option, Text } from '@fxtrot/edge';

import styles from './styles.css';

const More: React.FC = () => {
  return (
    <MenuButton placement="top-start">
      <Button
        tone="transparent"
        size="xs"
        aria-label="More"
        className={styles.menuButton}
      >
        <Icon icon="more_vert" />
      </Button>
      <ListBox className={styles.listbox}>
        <Option
          className={styles.option}
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
