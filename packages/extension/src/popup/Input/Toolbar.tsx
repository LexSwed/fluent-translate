import React from 'react';
import { Row } from '@fxtrot/ui';
import { Memory } from '../Memory';
import { More } from './More';

export const Toolbar = () => {
  return (
    <Row gap="1" cross="center">
      <Memory />
      <More />
    </Row>
  );
};
