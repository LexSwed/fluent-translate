import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/core';

import MemoryHeading from '../Memory/MemoryHeading';
import Memory from '../Memory';
import { useMemory } from '../Memory/Memory';
import More from './More';

const Footer = () => {
  const [isOpen, setOpen] = useState(false);
  const isMemory = useMemoryItemsNotEmpty();

  useEffect(() => {
    if (!isMemory) {
      setOpen(false);
    }
  }, [isMemory]);

  return (
    <Box
      position="absolute"
      top="calc(100vh - 38px)"
      left={0}
      width="100%"
      transition="transform 0.24s ease-in-out"
      height="100vh"
      overflow="hidden"
      backgroundColor="var(--bg-color-1)"
      transform={isOpen ? 'translateY(calc(-1 * (100vh - 38px)))' : ''}
    >
      <Box
        px={4}
        py={2}
        height="38px"
        borderBottom="1px solid transparent"
        borderBottomColor={isOpen ? 'gray.300' : 'transparent'}
      >
        <Flex align="center" justifyContent="space-between">
          <More />
          {isMemory ? (
            <MemoryHeading isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
          ) : null}
        </Flex>
      </Box>
      {isOpen && <Memory />}
    </Box>
  );
};

export default Footer;

function useMemoryItemsNotEmpty(): boolean {
  const memory = useMemory();

  return memory.length > 0;
}
