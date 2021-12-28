import React from 'react';

import Close, { CloseButton } from './Close';
import Timer, { Svg } from './Timer';
import { Box, styled } from '@fxtrot/ui';

type Props = {
  isMouseOver: boolean;
  onClose: () => void;
};

const Wrapper = styled(Box, {
  position: 'absolute',
  top: '$2',
  right: '$2',
  display: 'grid',
  gridTemplateColumns: '$sizes$8',
  gridTemplateRows: '$sizes$8',

  [`& > *`]: {
    gridArea: '1 / 1 / 1 / 1',
    placeSelf: 'center',
  },

  variants: {
    isMouseOver: {
      true: {
        [`${Svg}`]: {
          transition: 'none',
          opacity: 0,
          transform: 'scale(0)',
        },
        [`${CloseButton}`]: {
          opacity: 1,
        },
        [`${Svg} path`]: {
          transition: 'none',
        },
      },
    },
  },
});

const CloseTimer: React.FC<Props> = ({ isMouseOver, onClose }) => {
  return (
    <Wrapper isMouseOver={isMouseOver}>
      <Timer isMouseOver={isMouseOver} onTimeout={onClose} />
      <Close onClick={onClose} />
    </Wrapper>
  );
};

export default CloseTimer;
