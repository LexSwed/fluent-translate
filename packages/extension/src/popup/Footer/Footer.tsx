import { useState, useEffect } from 'react';
import { styled, Box } from '@fxtrot/ui';

import MemoryHeading from '../Memory/MemoryHeading';
import { Memory } from '../Memory';
import More from './More';
import { useTranslatingStatus, useMemoryItems } from '../atoms';
import { AnimatePresence, motion } from 'framer-motion';

export const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  const [items] = useMemoryItems();
  const translating = useTranslatingStatus();
  const hasMemoryItems = items.length > 0;

  useEffect(() => {
    if (!hasMemoryItems) {
      setOpen(false);
    }
  }, [hasMemoryItems]);

  return (
    <MainSheet open={isOpen}>
      <FooterBar>
        {!isOpen && <More />}
        {hasMemoryItems && (
          <Box ml="auto">
            <MemoryHeading isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
          </Box>
        )}
        <AnimatePresence>
          {translating && (
            <FetchingBar
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 0.95, transition: { duration: 1.5 } }}
              exit={{ scaleX: 1, scaleY: 0 }}
            />
          )}
        </AnimatePresence>
      </FooterBar>
      <Content>{isOpen && <Memory />}</Content>
    </MainSheet>
  );
};

const FetchingBar = styled(motion.span, {
  display: 'block',
  height: 2,
  width: '100%',
  position: 'absolute',
  left: 0,
  top: -2,
  bc: '$accent',
  transformOrigin: 'left center',
});

const FooterBar = styled('footer', {
  p: '$2',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid transparent',
  borderTop: '1px solid $borderLight',
  transition: '0.2s 0.1s ease-in',
  position: 'relative',
});

const MainSheet = styled('section', {
  $$offset: '$sizes$12',
  position: 'fixed',
  top: 'calc(100% - $$offset)',
  left: 0,
  width: '100%',
  transition: 'transform 0.24s ease-in-out',
  minHeight: '100vh',
  variants: {
    open: {
      true: {
        transform: 'translateY(calc(-1 * (100vh - $$offset)))',
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
  scrollSnapType: 'y mandatory',
  height: 'calc(100vh - $$offset)',
  bc: '$surfaceStill',
  pb: '$1',
});
