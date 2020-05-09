import React, { useState } from 'react';
import cx from 'classnames';
import { Box, Columns, Column } from '@fxtrot/edge';

import styles from './styles.css';

import HistoryHeading from '../History/HistoryHeading';
import History from '../History';
import { useHistory } from '../History/History';

const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();

  return (
    <div className={cx(styles.footer, isOpen && styles.footerOpen)}>
      <Box
        px="m"
        py="s"
        className={cx(styles.footerBar, isOpen && styles.footerBarOpen)}
      >
        <Columns align="right" alignY="center">
          {Boolean(history.length) && (
            <Column width="content">
              <HistoryHeading
                isOpen={isOpen}
                onClick={() => setOpen(!isOpen)}
              />
            </Column>
          )}
        </Columns>
      </Box>
      {isOpen && <History onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Footer;
