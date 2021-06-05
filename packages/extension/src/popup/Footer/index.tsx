import React, { useState, useEffect } from 'react';
import { styled, Box } from '@fxtrot/ui';

import MemoryHeading from '../Memory/MemoryHeading';
import { Memory, useMemory } from '../Memory';
import More from './More';

export const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  const hasMemoryItems = useMemoryItemsNotEmpty();

  useEffect(() => {
    if (!hasMemoryItems) {
      setOpen(false);
    }
  }, [hasMemoryItems]);

  return (
    <MainSheet open={isOpen}>
      <FooterBar open={isOpen}>
        {!isOpen && <More />}
        {hasMemoryItems && (
          <Box ml="auto">
            <MemoryHeading isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
          </Box>
        )}
      </FooterBar>
      <Content>{isOpen && <Memory />}</Content>
    </MainSheet>
  );
};

function useMemoryItemsNotEmpty(): boolean {
  const memory = useMemory();

  return memory.length > 0;
}

const FooterBar = styled('footer', {
  height: '$base',
  p: '$2',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid transparent',
  borderTop: '1px solid $borderLight',
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

const MainSheet = styled('section', {
  position: 'fixed',
  top: 'calc(100% - $sizes$base)',
  left: 0,
  width: '100%',
  transition: 'transform 0.24s ease-in-out',
  minHeight: '100vh',
  overflow: 'auto',
  bc: '$surfaceStill',
  variants: {
    open: {
      true: {
        transform: 'translateY(calc(-1 * (100vh - $sizes$base)))',

        [`& > ${FooterBar}`]: {
          bc: '$surfaceHover',
          borderColor: '$surfaceActive',
        },
      },
    },
  },
});

const Content = styled('div', {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: 'calc(100vh - $sizes$base)',
});
