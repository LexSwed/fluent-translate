import React, { useState, useEffect } from 'react';
import { styled, Box } from '@fxtrot/ui';

import MemoryHeading from '../Memory/MemoryHeading';
import Memory from '../Memory';
import { useMemory } from '../Memory/Memory';
import More from './More';

const MainSheet = styled(Box, {
  position: 'absolute',
  top: 'calc(100vh - 40px)',
  left: 0,
  width: '100%',
  transition: 'transform 0.24s ease-in-out',
  minHeight: '100vh',
  overflow: 'hidden',
  bc: '$surfaceStill',
  variants: {
    open: {
      true: {
        transform: 'translateY(calc(-1 * (100vh - 40px)))',
      },
    },
  },
});

const FooterBar = styled(Box, {
  p: '$2',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid transparent',
  transition: '0.2s 0.1s ease-in',
  variants: {
    open: {
      true: {
        bc: '$surfaceHover',
        borderColor: '$surfaceActive',
      },
    },
  },
});

const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  const isMemory = useMemoryItemsNotEmpty();

  useEffect(() => {
    if (!isMemory) {
      setOpen(false);
    }
  }, [isMemory]);

  return (
    <MainSheet as="section" open={isOpen}>
      <FooterBar as="footer" open={isOpen}>
        <More />
        {isMemory ? (
          <MemoryHeading isOpen={isOpen} onPress={() => setOpen(!isOpen)} />
        ) : null}
      </FooterBar>
      {isOpen && <Memory />}
    </MainSheet>
  );
};

export default Footer;

function useMemoryItemsNotEmpty(): boolean {
  const memory = useMemory();

  return memory.length > 0;
}
