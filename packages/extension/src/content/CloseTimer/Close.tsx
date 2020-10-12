import React from 'react';
import { Button, Icon, styled } from '@fxtrot/ui';

const svg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="100%"
    height="100%"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

export const CloseButton = styled(Button, {
  p: 0,
  size: '$5',
  opacity: 0,
});

const Close: React.FC<React.ComponentProps<typeof Button>> = (props) => {
  return (
    <CloseButton {...props} variant="flat" size="sm">
      <Icon as={svg} />
    </CloseButton>
  );
};

export default Close;
