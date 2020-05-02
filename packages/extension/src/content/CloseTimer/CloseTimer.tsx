import React from 'react';
import cx from 'classnames';

import styles from './styles.css';

import Close from './Close';
import Timer from './Timer';

type Props = {
  isMouseOver: boolean;
  onClose: () => void;
};

const CloseTimer: React.FC<Props> = ({ isMouseOver, onClose }) => {
  return (
    <div className={cx(styles.container, isMouseOver && styles.hovered)}>
      <Timer isMouseOver={isMouseOver} onTimeout={onClose} />
      <Close onClick={() => onClose()} />
    </div>
  );
};

export default CloseTimer;
