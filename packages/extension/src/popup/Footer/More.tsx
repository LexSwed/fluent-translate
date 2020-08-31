import React from 'react';
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Icon,
  Text,
} from '@chakra-ui/core';
import { GoKebabVertical } from 'react-icons/go';

import styles from './styles.css';
import TranslatorLink from '../TranslatorLink';

const More: React.FC = () => {
  return (
    <Menu>
      <MenuButton as={Button} aria-label="More" size={4} variant="ghost">
        <Icon as={GoKebabVertical} />
      </MenuButton>
      <MenuList className={styles.listbox}>
        <MenuItem
          className={styles.MenuItem}
          onClick={() =>
            chrome.tabs.create({
              url: 'https://alexanderswed.typeform.com/to/sjSxc6',
            })
          }
        >
          <Text>Leave Feedback</Text>
        </MenuItem>
        <MenuItem className={styles.MenuItem}>
          <TranslatorLink className={styles.text}>
            <Text>Open in Microsoft Bing</Text>
          </TranslatorLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default More;
