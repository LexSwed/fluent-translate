import { Flex } from '@fxtrot/ui';
import { Memory } from '../Memory';
import { More } from './More';

export const Toolbar = () => {
  return (
    <Flex gap="1" flow="row" cross="center">
      <Memory />
      <More />
    </Flex>
  );
};
